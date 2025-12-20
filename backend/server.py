from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
import random
import string
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Lead Capture Models
class LeadCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None

class LeadResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: Optional[str] = None
    phone: Optional[str] = None
    coupon_code: str
    discount: str = "15%"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc) + timedelta(days=30))
    used: bool = False

def generate_coupon_code():
    """Generate a unique coupon code like SNATCH-XXXX"""
    chars = string.ascii_uppercase + string.digits
    random_part = ''.join(random.choices(chars, k=6))
    return f"SNATCH-{random_part}"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Lead Capture Endpoints
@api_router.post("/leads")
async def create_lead(lead_input: LeadCreate):
    """Create a new lead and generate a coupon code"""
    # Check if email already exists
    existing_lead = await db.leads.find_one({"email": lead_input.email})
    
    if existing_lead:
        # Return existing coupon if email already registered
        return {
            "id": existing_lead.get("id"),
            "email": existing_lead.get("email"),
            "name": existing_lead.get("name"),
            "couponCode": existing_lead.get("coupon_code"),
            "discount": existing_lead.get("discount", "15%"),
            "message": "Welcome back! Here's your existing coupon."
        }
    
    # Generate new coupon code
    coupon_code = generate_coupon_code()
    
    # Create lead document
    lead = LeadResponse(
        email=lead_input.email,
        name=lead_input.name,
        phone=lead_input.phone,
        coupon_code=coupon_code
    )
    
    # Convert to dict for MongoDB
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['expires_at'] = doc['expires_at'].isoformat()
    
    # Save to database
    await db.leads.insert_one(doc)
    
    logger.info(f"New lead created: {lead_input.email} with coupon {coupon_code}")
    
    return {
        "id": lead.id,
        "email": lead.email,
        "name": lead.name,
        "couponCode": lead.coupon_code,
        "discount": lead.discount,
        "expiresAt": lead.expires_at.isoformat(),
        "message": "Success! Here's your exclusive discount code."
    }

@api_router.get("/leads")
async def get_all_leads():
    """Get all leads (admin endpoint)"""
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    return {"leads": leads, "total": len(leads)}

@api_router.get("/leads/stats")
async def get_lead_stats():
    """Get lead statistics"""
    total_leads = await db.leads.count_documents({})
    used_coupons = await db.leads.count_documents({"used": True})
    
    # Get leads from last 7 days
    seven_days_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    recent_leads = await db.leads.count_documents({
        "created_at": {"$gte": seven_days_ago}
    })
    
    return {
        "totalLeads": total_leads,
        "usedCoupons": used_coupons,
        "recentLeads": recent_leads,
        "conversionRate": f"{(used_coupons / total_leads * 100):.1f}%" if total_leads > 0 else "0%"
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()