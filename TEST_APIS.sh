#!/bin/bash

echo "================================================"
echo "🧪 Testing Spring Boot Backend APIs"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="http://localhost:8001/api"

echo -e "${BLUE}1. Testing User Registration...${NC}"
echo "POST $API_URL/auth/register"
curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "guest"
  }' | jq '.'
echo ""
echo "---"
echo ""

echo -e "${BLUE}2. Testing User Login...${NC}"
echo "POST $API_URL/auth/login"
TOKEN=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }' | jq -r '.token')
echo "Token received: $TOKEN"
echo ""
echo "---"
echo ""

echo -e "${BLUE}3. Testing Get All Rooms...${NC}"
echo "GET $API_URL/rooms"
curl -s $API_URL/rooms | jq '.'
echo ""
echo "---"
echo ""

echo -e "${BLUE}4. Creating a Room (requires admin token)...${NC}"
echo "POST $API_URL/rooms"
curl -s -X POST $API_URL/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "number": "201",
    "type": "deluxe",
    "pricePerNight": 2500.0,
    "capacity": 2,
    "status": "AVAILABLE"
  }' | jq '.'
echo ""
echo "---"
echo ""

echo -e "${BLUE}5. Testing Guest Booking (No Auth Required)...${NC}"
echo "POST $API_URL/bookings"
curl -s -X POST $API_URL/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "roomType": "deluxe",
    "checkInDate": "2025-12-01",
    "checkOutDate": "2025-12-05",
    "numberOfGuests": 2,
    "specialRequests": "Late checkout please",
    "totalPrice": 9996.0
  }' | jq '.'
echo ""
echo "---"
echo ""

echo -e "${BLUE}6. Testing Get All Bookings (requires auth)...${NC}"
echo "GET $API_URL/bookings"
curl -s $API_URL/bookings \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo "---"
echo ""

echo -e "${GREEN}✅ API Testing Complete!${NC}"
echo ""
echo "================================================"
echo "📚 View API Documentation:"
echo "   Swagger UI: http://localhost:8001/api/swagger-ui.html"
echo "================================================"
