from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
import random
import string
from datetime import datetime, timezone, timedelta
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Snatched Beauties API", version="2.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Stripe Configuration
stripe_api_key = os.environ.get('STRIPE_SECRET_KEY')
stripe_publishable_key = os.environ.get('STRIPE_PUBLISHABLE_KEY')

# Beauty Service Packages (Server-side defined for security)
SERVICE_PACKAGES = {
    "ultrasonic_cavitation": {"name": "Ultrasonic Cavitation", "price": 150.00, "duration": 60, "description": "Break down stubborn fat with advanced, non-invasive technology"},
    "ems_muscle_stimulation": {"name": "EMS (Electrical Muscle Stimulation)", "price": 125.00, "duration": 30, "description": "Boost muscle tone and strength for a sculpted physique"},
    "vacuum_therapy_bbl": {"name": "Vacuum Therapy BBL", "price": 150.00, "duration": 90, "description": "Lift and shape your buttocks with cutting-edge sculpting techniques"},
    "meal_prep_program": {"name": "Meal Prep by Our Chef", "price": 299.00, "duration": 30, "description": "Personalized meal prep program designed by our in-house certified chef"},
    "fat_dissolve_injections": {"name": "Fat Dissolve Injections", "price": 0.00, "duration": 30, "description": "Naturally eliminate unwanted fat through targeted injection therapies", "variable_pricing": True},
    "electroporation": {"name": "Electroporation", "price": 175.00, "duration": 60, "description": "Painless, needle-free mesotherapy alternative for flawless skin using electric fields"},
    "radio_frequency": {"name": "Radio Frequency (RF)", "price": 140.00, "duration": 45, "description": "Skin tightening, wrinkle reduction, and body contouring using electromagnetic waves"},
    "lymphatic_massage": {"name": "Lymphatic Massage", "price": 120.00, "duration": 60, "description": "Post-op care massage stimulating lymphatic system for toxin and fluid removal"},
    "wood_therapy": {"name": "Wood Therapy", "price": 130.00, "duration": 60, "description": "Vigorous massage using wooden tools to break down fat and reduce cellulite"},
    "consultation": {"name": "Body Sculpting Consultation", "price": 0.00, "duration": 30, "description": "Discuss body goals and create custom treatment plan"}
}

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

# Contact Form Models
class ContactFormCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Payment Models
class PaymentTransactionCreate(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_package: str
    amount: float
    currency: str = "usd"
    customer_email: str
    customer_name: Optional[str] = None
    session_id: str
    payment_status: str = "pending"
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Booking Models
class BookingCreate(BaseModel):
    service_package: str
    preferred_date: str
    preferred_time: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    special_requests: Optional[str] = None

class BookingResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_package: str
    service_details: Dict[str, Any]
    preferred_date: str
    preferred_time: str
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    special_requests: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Stripe Payment Request Models
class PaymentRequest(BaseModel):
    service_package: str
    customer_email: str
    customer_name: Optional[str] = None
    units: Optional[int] = 1  # For unit-based services like botox
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None

def generate_coupon_code():
    """Generate a unique coupon code like SNATCH-XXXX"""
    chars = string.ascii_uppercase + string.digits
    random_part = ''.join(random.choices(chars, k=6))
    return f"SNATCH-{random_part}"

# Initialize Stripe Checkout
def get_stripe_checkout(base_url: str) -> StripeCheckout:
    webhook_url = f"{base_url}/api/webhook/stripe"
    return StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)

# Basic Health Routes
@api_router.get("/")
async def root():
    return {"message": "Snatched Beauties API v2.0", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "services": {
            "database": "connected",
            "stripe": "configured" if stripe_api_key else "not_configured"
        }
    }

# Service Information Routes
@api_router.get("/services")
async def get_services():
    """Get all available beauty services"""
    return {
        "services": SERVICE_PACKAGES,
        "total_services": len(SERVICE_PACKAGES)
    }

@api_router.get("/services/{service_id}")
async def get_service_details(service_id: str):
    """Get details for a specific service"""
    if service_id not in SERVICE_PACKAGES:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service = SERVICE_PACKAGES[service_id]
    return {
        "service_id": service_id,
        "service_details": service
    }

# Existing Lead Capture Endpoints
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

# Contact Form Endpoint
@api_router.post("/contact")
async def create_contact_form(contact_input: ContactFormCreate):
    """Handle contact form submissions"""
    contact_doc = {
        "id": str(uuid.uuid4()),
        "full_name": contact_input.full_name,
        "email": contact_input.email,
        "phone": contact_input.phone,
        "message": contact_input.message,
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.contact_forms.insert_one(contact_doc)
    
    logger.info(f"New contact form submission from {contact_input.email}")
    
    return {
        "message": "Thank you for your message! We'll get back to you soon.",
        "status": "success"
    }

# Booking Endpoints
@api_router.post("/bookings")
async def create_booking(booking_input: BookingCreate):
    """Create a new booking"""
    if booking_input.service_package not in SERVICE_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid service package")
    
    service_details = SERVICE_PACKAGES[booking_input.service_package]
    
    booking = BookingResponse(
        service_package=booking_input.service_package,
        service_details=service_details,
        preferred_date=booking_input.preferred_date,
        preferred_time=booking_input.preferred_time,
        customer_name=booking_input.customer_name,
        customer_email=booking_input.customer_email,
        customer_phone=booking_input.customer_phone,
        special_requests=booking_input.special_requests
    )
    
    # Convert to dict for MongoDB
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    
    logger.info(f"New booking created: {booking_input.customer_email} for {booking_input.service_package}")
    
    return {
        "booking_id": booking.id,
        "service": service_details["name"],
        "date": booking_input.preferred_date,
        "time": booking_input.preferred_time,
        "status": "pending_confirmation",
        "message": "Booking request submitted! We'll confirm your appointment shortly."
    }

@api_router.get("/bookings")
async def get_all_bookings():
    """Get all bookings (admin endpoint)"""
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    return {"bookings": bookings, "total": len(bookings)}

# Stripe Payment Endpoints
@api_router.post("/payments/checkout")
async def create_payment_checkout(payment_request: PaymentRequest, request: Request):
    """Create Stripe checkout session for service payment"""
    if payment_request.service_package not in SERVICE_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid service package")
    
    service = SERVICE_PACKAGES[payment_request.service_package]
    
    # Calculate amount (handle unit-based services like botox)
    if service.get("unit_based", False):
        amount = service["price"] * payment_request.units
        description = f"{service['name']} - {payment_request.units} units"
    else:
        amount = service["price"]
        description = service["name"]
    
    # Get base URL from request
    base_url = str(request.base_url).rstrip('/')
    
    # Create success and cancel URLs
    success_url = payment_request.success_url or f"{base_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = payment_request.cancel_url or f"{base_url}/payment/cancel"
    
    try:
        # Initialize Stripe checkout
        stripe_checkout = get_stripe_checkout(base_url)
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "service_package": payment_request.service_package,
                "customer_email": payment_request.customer_email,
                "customer_name": payment_request.customer_name or "",
                "units": str(payment_request.units),
                "description": description
            }
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record
        transaction = PaymentTransactionCreate(
            service_package=payment_request.service_package,
            amount=amount,
            customer_email=payment_request.customer_email,
            customer_name=payment_request.customer_name,
            session_id=session.session_id,
            payment_status="pending",
            metadata={
                "service_name": service["name"],
                "units": payment_request.units,
                "description": description
            }
        )
        
        # Store in database
        transaction_doc = transaction.model_dump()
        transaction_doc['created_at'] = transaction_doc['created_at'].isoformat()
        transaction_doc['updated_at'] = transaction_doc['updated_at'].isoformat()
        
        await db.payment_transactions.insert_one(transaction_doc)
        
        logger.info(f"Payment checkout created for {payment_request.customer_email}: {session.session_id}")
        
        return {
            "checkout_url": session.url,
            "session_id": session.session_id,
            "amount": amount,
            "service": service["name"],
            "description": description
        }
        
    except Exception as e:
        logger.error(f"Payment checkout creation failed: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Payment setup failed: {str(e)}")

@api_router.get("/payments/checkout/status/{session_id}")
async def get_payment_status(session_id: str, request: Request):
    """Get payment status for a checkout session"""
    try:
        base_url = str(request.base_url).rstrip('/')
        stripe_checkout = get_stripe_checkout(base_url)
        
        # Get status from Stripe
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update local transaction record
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        
        if transaction and transaction["payment_status"] != checkout_status.payment_status:
            # Update only if status has changed to avoid duplicate processing
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "payment_status": checkout_status.payment_status,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
            
            logger.info(f"Payment status updated for session {session_id}: {checkout_status.payment_status}")
        
        return {
            "session_id": session_id,
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "amount_total": checkout_status.amount_total,
            "currency": checkout_status.currency,
            "metadata": checkout_status.metadata
        }
        
    except Exception as e:
        logger.error(f"Payment status check failed for {session_id}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Payment status check failed: {str(e)}")

@api_router.get("/payments/transactions")
async def get_payment_transactions():
    """Get all payment transactions (admin endpoint)"""
    transactions = await db.payment_transactions.find({}, {"_id": 0}).to_list(1000)
    return {"transactions": transactions, "total": len(transactions)}

# Stripe Webhook Endpoint
@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="Missing Stripe signature")
        
        base_url = str(request.base_url).rstrip('/')
        stripe_checkout = get_stripe_checkout(base_url)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        logger.info(f"Webhook processed: {webhook_response.event_type} for session {webhook_response.session_id}")
        
        # Update transaction based on webhook
        if webhook_response.session_id:
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {
                    "$set": {
                        "payment_status": webhook_response.payment_status,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook processing failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")

# Status Check Routes (existing)
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

# Add startup event
@app.on_event("startup")
async def startup_event():
    logger.info("Snatched Beauties API v2.0 started")
    logger.info(f"Stripe configured: {stripe_api_key is not None}")
    logger.info(f"Available services: {len(SERVICE_PACKAGES)}")