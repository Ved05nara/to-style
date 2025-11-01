#!/bin/bash

# Seed Rooms
echo "Seeding rooms..."
curl -X POST http://localhost:8001/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "number": "101",
    "type": "deluxe",
    "pricePerNight": 1999.0,
    "capacity": 2,
    "status": "AVAILABLE"
  }'

curl -X POST http://localhost:8001/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "number": "102",
    "type": "executive",
    "pricePerNight": 3499.0,
    "capacity": 3,
    "status": "AVAILABLE"
  }'

curl -X POST http://localhost:8001/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "number": "103",
    "type": "presidential",
    "pricePerNight": 5999.0,
    "capacity": 4,
    "status": "AVAILABLE"
  }'

echo -e "\n\nSeeding complete!"
