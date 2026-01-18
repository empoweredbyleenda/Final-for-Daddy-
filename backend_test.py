#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Snatched Beauties
Tests all enhanced API endpoints including services, leads, bookings, payments, and contact forms.
"""

import requests
import json
import uuid
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://snatched-project.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend API at: {API_BASE_URL}")

class BeautyAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = f"{status} - {test_name}"
        if details:
            result += f" | {details}"
        print(result)
        self.test_results.append({"test": test_name, "success": success, "details": details})
        if not success:
            self.failed_tests.append({"test": test_name, "details": details})
    
    def test_health_endpoints(self):
        """Test basic health and status endpoints"""
        print("\n=== Testing Health & Status Endpoints ===")
        
        # Test basic API status
        try:
            response = self.session.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("GET /api/ - Basic API status", True, f"Status: {data.get('status')}")
                else:
                    self.log_test("GET /api/ - Basic API status", False, "Missing required fields in response")
            else:
                self.log_test("GET /api/ - Basic API status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/ - Basic API status", False, f"Exception: {str(e)}")
        
        # Test comprehensive health check
        try:
            response = self.session.get(f"{API_BASE_URL}/health")
            if response.status_code == 200:
                data = response.json()
                if "status" in data and "services" in data:
                    db_status = data["services"].get("database", "unknown")
                    stripe_status = data["services"].get("stripe", "unknown")
                    self.log_test("GET /api/health - Health check", True, 
                                f"DB: {db_status}, Stripe: {stripe_status}")
                else:
                    self.log_test("GET /api/health - Health check", False, "Missing required fields")
            else:
                self.log_test("GET /api/health - Health check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/health - Health check", False, f"Exception: {str(e)}")
    
    def test_service_endpoints(self):
        """Test service management endpoints"""
        print("\n=== Testing Service Management Endpoints ===")
        
        # Test get all services
        try:
            response = self.session.get(f"{API_BASE_URL}/services")
            if response.status_code == 200:
                data = response.json()
                if "services" in data and "total_services" in data:
                    services = data["services"]
                    expected_services = ["facial_basic", "facial_premium", "microblading", 
                                       "lash_extensions", "chemical_peel", "botox", 
                                       "dermal_filler", "consultation"]
                    
                    # Check if all expected services are present
                    missing_services = [s for s in expected_services if s not in services]
                    if not missing_services and len(services) == 8:
                        self.log_test("GET /api/services - List all services", True, 
                                    f"Found {len(services)} services")
                        
                        # Test individual service details
                        self.test_individual_services(expected_services)
                    else:
                        self.log_test("GET /api/services - List all services", False, 
                                    f"Missing services: {missing_services}")
                else:
                    self.log_test("GET /api/services - List all services", False, "Missing required fields")
            else:
                self.log_test("GET /api/services - List all services", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/services - List all services", False, f"Exception: {str(e)}")
    
    def test_individual_services(self, service_ids):
        """Test individual service detail endpoints"""
        for service_id in service_ids:
            try:
                response = self.session.get(f"{API_BASE_URL}/services/{service_id}")
                if response.status_code == 200:
                    data = response.json()
                    if "service_id" in data and "service_details" in data:
                        details = data["service_details"]
                        required_fields = ["name", "price", "duration", "description"]
                        missing_fields = [f for f in required_fields if f not in details]
                        
                        if not missing_fields:
                            price_info = f"${details['price']}"
                            if details.get("unit_based"):
                                price_info += " per unit"
                            self.log_test(f"GET /api/services/{service_id}", True, 
                                        f"{details['name']} - {price_info}")
                        else:
                            self.log_test(f"GET /api/services/{service_id}", False, 
                                        f"Missing fields: {missing_fields}")
                    else:
                        self.log_test(f"GET /api/services/{service_id}", False, "Missing required response fields")
                else:
                    self.log_test(f"GET /api/services/{service_id}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_test(f"GET /api/services/{service_id}", False, f"Exception: {str(e)}")
        
        # Test invalid service ID
        try:
            response = self.session.get(f"{API_BASE_URL}/services/invalid_service")
            if response.status_code == 404:
                self.log_test("GET /api/services/invalid - Error handling", True, "Correctly returns 404")
            else:
                self.log_test("GET /api/services/invalid - Error handling", False, 
                            f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/services/invalid - Error handling", False, f"Exception: {str(e)}")
    
    def test_lead_capture_endpoints(self):
        """Test enhanced lead capture endpoints"""
        print("\n=== Testing Lead Capture Endpoints ===")
        
        # Generate unique test data
        test_email = f"test.user.{uuid.uuid4().hex[:8]}@snatchedbeauties.com"
        test_name = "Sophia Martinez"
        test_phone = "+1-555-0123"
        
        # Test create lead
        lead_data = {
            "email": test_email,
            "name": test_name,
            "phone": test_phone
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/leads", json=lead_data)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "email", "couponCode", "discount", "message"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    coupon_code = data["couponCode"]
                    if coupon_code.startswith("SNATCH-") and len(coupon_code) == 13:
                        self.log_test("POST /api/leads - Create lead", True, 
                                    f"Generated coupon: {coupon_code}")
                        
                        # Test duplicate email (should return existing coupon)
                        response2 = self.session.post(f"{API_BASE_URL}/leads", json=lead_data)
                        if response2.status_code == 200:
                            data2 = response2.json()
                            if data2["couponCode"] == coupon_code:
                                self.log_test("POST /api/leads - Duplicate email handling", True, 
                                            "Returns existing coupon")
                            else:
                                self.log_test("POST /api/leads - Duplicate email handling", False, 
                                            "Different coupon returned")
                        else:
                            self.log_test("POST /api/leads - Duplicate email handling", False, 
                                        f"Status code: {response2.status_code}")
                    else:
                        self.log_test("POST /api/leads - Create lead", False, 
                                    f"Invalid coupon format: {coupon_code}")
                else:
                    self.log_test("POST /api/leads - Create lead", False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("POST /api/leads - Create lead", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/leads - Create lead", False, f"Exception: {str(e)}")
        
        # Test get all leads (admin endpoint)
        try:
            response = self.session.get(f"{API_BASE_URL}/leads")
            if response.status_code == 200:
                data = response.json()
                if "leads" in data and "total" in data:
                    total_leads = data["total"]
                    self.log_test("GET /api/leads - List all leads", True, f"Found {total_leads} leads")
                else:
                    self.log_test("GET /api/leads - List all leads", False, "Missing required fields")
            else:
                self.log_test("GET /api/leads - List all leads", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/leads - List all leads", False, f"Exception: {str(e)}")
        
        # Test lead statistics
        try:
            response = self.session.get(f"{API_BASE_URL}/leads/stats")
            if response.status_code == 200:
                data = response.json()
                required_fields = ["totalLeads", "usedCoupons", "recentLeads", "conversionRate"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    self.log_test("GET /api/leads/stats - Lead statistics", True, 
                                f"Total: {data['totalLeads']}, Conversion: {data['conversionRate']}")
                else:
                    self.log_test("GET /api/leads/stats - Lead statistics", False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/leads/stats - Lead statistics", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/leads/stats - Lead statistics", False, f"Exception: {str(e)}")
    
    def test_booking_endpoints(self):
        """Test booking system endpoints"""
        print("\n=== Testing Booking System Endpoints ===")
        
        # Generate unique test data
        test_email = f"booking.test.{uuid.uuid4().hex[:8]}@snatchedbeauties.com"
        test_name = "Isabella Rodriguez"
        test_phone = "+1-555-0456"
        
        # Test create booking with valid service
        booking_data = {
            "service_package": "facial_premium",
            "preferred_date": "2024-02-15",
            "preferred_time": "2:00 PM",
            "customer_name": test_name,
            "customer_email": test_email,
            "customer_phone": test_phone,
            "special_requests": "Please use hypoallergenic products"
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/bookings", json=booking_data)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["booking_id", "service", "date", "time", "status", "message"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    self.log_test("POST /api/bookings - Create booking", True, 
                                f"Booking ID: {data['booking_id'][:8]}...")
                else:
                    self.log_test("POST /api/bookings - Create booking", False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("POST /api/bookings - Create booking", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/bookings - Create booking", False, f"Exception: {str(e)}")
        
        # Test booking with invalid service package
        invalid_booking_data = booking_data.copy()
        invalid_booking_data["service_package"] = "invalid_service"
        
        try:
            response = self.session.post(f"{API_BASE_URL}/bookings", json=invalid_booking_data)
            if response.status_code == 400:
                self.log_test("POST /api/bookings - Invalid service error", True, "Correctly returns 400")
            else:
                self.log_test("POST /api/bookings - Invalid service error", False, 
                            f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/bookings - Invalid service error", False, f"Exception: {str(e)}")
        
        # Test get all bookings (admin endpoint)
        try:
            response = self.session.get(f"{API_BASE_URL}/bookings")
            if response.status_code == 200:
                data = response.json()
                if "bookings" in data and "total" in data:
                    total_bookings = data["total"]
                    self.log_test("GET /api/bookings - List all bookings", True, 
                                f"Found {total_bookings} bookings")
                else:
                    self.log_test("GET /api/bookings - List all bookings", False, "Missing required fields")
            else:
                self.log_test("GET /api/bookings - List all bookings", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/bookings - List all bookings", False, f"Exception: {str(e)}")
    
    def test_contact_form_endpoint(self):
        """Test contact form submission endpoint"""
        print("\n=== Testing Contact Form Endpoint ===")
        
        # Generate unique test data
        test_email = f"contact.test.{uuid.uuid4().hex[:8]}@snatchedbeauties.com"
        
        contact_data = {
            "full_name": "Valentina Chen",
            "email": test_email,
            "phone": "+1-555-0789",
            "message": "I'm interested in learning more about your microblading services. Do you offer consultations?"
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/contact", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    if data["status"] == "success":
                        self.log_test("POST /api/contact - Contact form submission", True, 
                                    "Form submitted successfully")
                    else:
                        self.log_test("POST /api/contact - Contact form submission", False, 
                                    f"Unexpected status: {data['status']}")
                else:
                    self.log_test("POST /api/contact - Contact form submission", False, 
                                "Missing required response fields")
            else:
                self.log_test("POST /api/contact - Contact form submission", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/contact - Contact form submission", False, f"Exception: {str(e)}")
    
    def test_payment_endpoints(self):
        """Test Stripe payment integration endpoints"""
        print("\n=== Testing Payment Integration Endpoints ===")
        
        # Generate unique test data
        test_email = f"payment.test.{uuid.uuid4().hex[:8]}@snatchedbeauties.com"
        test_name = "Aurora Williams"
        
        # Test payment checkout creation for regular service
        payment_data = {
            "service_package": "microblading",
            "customer_email": test_email,
            "customer_name": test_name,
            "success_url": f"{BACKEND_URL}/payment/success",
            "cancel_url": f"{BACKEND_URL}/payment/cancel"
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/payments/checkout", json=payment_data)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["checkout_url", "session_id", "amount", "service", "description"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    session_id = data["session_id"]
                    amount = data["amount"]
                    self.log_test("POST /api/payments/checkout - Regular service", True, 
                                f"Amount: ${amount}, Session: {session_id[:20]}...")
                    
                    # Test payment status check
                    self.test_payment_status(session_id)
                else:
                    self.log_test("POST /api/payments/checkout - Regular service", False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("POST /api/payments/checkout - Regular service", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/payments/checkout - Regular service", False, f"Exception: {str(e)}")
        
        # Test payment checkout for unit-based service (botox)
        botox_payment_data = {
            "service_package": "botox",
            "customer_email": test_email,
            "customer_name": test_name,
            "units": 25,  # 25 units of botox
            "success_url": f"{BACKEND_URL}/payment/success",
            "cancel_url": f"{BACKEND_URL}/payment/cancel"
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/payments/checkout", json=botox_payment_data)
            if response.status_code == 200:
                data = response.json()
                expected_amount = 12.00 * 25  # $12 per unit * 25 units = $300
                if abs(data.get("amount", 0) - expected_amount) < 0.01:
                    self.log_test("POST /api/payments/checkout - Unit-based service", True, 
                                f"Botox 25 units: ${data['amount']}")
                else:
                    self.log_test("POST /api/payments/checkout - Unit-based service", False, 
                                f"Expected ${expected_amount}, got ${data.get('amount', 0)}")
            else:
                self.log_test("POST /api/payments/checkout - Unit-based service", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/payments/checkout - Unit-based service", False, f"Exception: {str(e)}")
        
        # Test payment checkout with invalid service
        invalid_payment_data = {
            "service_package": "invalid_service",
            "customer_email": test_email,
            "customer_name": test_name
        }
        
        try:
            response = self.session.post(f"{API_BASE_URL}/payments/checkout", json=invalid_payment_data)
            if response.status_code == 400:
                self.log_test("POST /api/payments/checkout - Invalid service error", True, 
                            "Correctly returns 400")
            else:
                self.log_test("POST /api/payments/checkout - Invalid service error", False, 
                            f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/payments/checkout - Invalid service error", False, f"Exception: {str(e)}")
        
        # Test get payment transactions (admin endpoint)
        try:
            response = self.session.get(f"{API_BASE_URL}/payments/transactions")
            if response.status_code == 200:
                data = response.json()
                if "transactions" in data and "total" in data:
                    total_transactions = data["total"]
                    self.log_test("GET /api/payments/transactions - List transactions", True, 
                                f"Found {total_transactions} transactions")
                else:
                    self.log_test("GET /api/payments/transactions - List transactions", False, 
                                "Missing required fields")
            else:
                self.log_test("GET /api/payments/transactions - List transactions", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/payments/transactions - List transactions", False, f"Exception: {str(e)}")
    
    def test_payment_status(self, session_id):
        """Test payment status endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/payments/checkout/status/{session_id}")
            if response.status_code == 200:
                data = response.json()
                required_fields = ["session_id", "status", "payment_status"]
                missing_fields = [f for f in required_fields if f not in data]
                
                if not missing_fields:
                    self.log_test("GET /api/payments/checkout/status - Payment status", True, 
                                f"Status: {data['payment_status']}")
                else:
                    self.log_test("GET /api/payments/checkout/status - Payment status", False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/payments/checkout/status - Payment status", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/payments/checkout/status - Payment status", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🧪 Starting Comprehensive Snatched Beauties Backend API Tests")
        print(f"📍 Testing API at: {API_BASE_URL}")
        print("=" * 80)
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_service_endpoints()
        self.test_lead_capture_endpoints()
        self.test_booking_endpoints()
        self.test_contact_form_endpoint()
        self.test_payment_endpoints()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if self.failed_tests:
            print("\n🚨 FAILED TESTS:")
            for test in self.failed_tests:
                print(f"   ❌ {test['test']}: {test['details']}")
        
        print("\n" + "=" * 80)
        
        if failed_tests == 0:
            print("🎉 ALL TESTS PASSED! Backend API is fully functional.")
        else:
            print(f"⚠️  {failed_tests} test(s) failed. Please review the issues above.")

if __name__ == "__main__":
    tester = BeautyAPITester()
    tester.run_all_tests()