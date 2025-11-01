# 🧪 Complete Testing Guide

## **Method 1: Test via Web Browser (Easiest)**

### Access the Frontend
Open your browser and go to:
```
https://sql-spring-layer.preview.emergentagent.com
```

### What to Test:
1. **Landing Page**: Should see the GuestHub Hotel Management System
2. **Register**: Click "Get Started" or "Register" and create an account
   - Try roles: `guest`, `staff`, `management`, `admin`
3. **Login**: Login with your credentials
4. **Book a Room**: Go to booking page and create a booking
5. **Dashboards**: Navigate to your role-specific dashboard

---

## **Method 2: Test Backend APIs with Script**

### Quick Test (Recommended)
Run the automated test script:
```bash
bash /app/TEST_APIS.sh
```

This will test:
- ✅ User registration
- ✅ User login
- ✅ Get all rooms
- ✅ Create a room
- ✅ Create a booking (guest - no auth)
- ✅ Get all bookings

---

## **Method 3: Test Individual APIs with cURL**

### 1. Register a New User
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@example.com",
    "password": "password123",
    "name": "Guest User",
    "role": "guest"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGc...",
  "userId": "123abc",
  "email": "guest@example.com",
  "name": "Guest User",
  "role": "guest"
}
```

---

### 2. Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGc...",
  "userId": "123abc",
  "email": "guest@example.com",
  "name": "Guest User",
  "role": "guest"
}
```

**Save the token** for authenticated requests!

---

### 3. Get All Rooms
```bash
curl http://localhost:8001/api/rooms
```

**Expected Response:**
```json
[]  // Empty initially, or list of rooms if you've created any
```

---

### 4. Create a Room (Admin Only)
First, register an admin user and get the token, then:

```bash
TOKEN="your_admin_token_here"

curl -X POST http://localhost:8001/api/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "number": "101",
    "type": "deluxe",
    "pricePerNight": 1999.0,
    "capacity": 2,
    "status": "AVAILABLE"
  }'
```

---

### 5. Create a Booking (No Auth Required!)
```bash
curl -X POST http://localhost:8001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "roomType": "deluxe",
    "checkInDate": "2025-12-01",
    "checkOutDate": "2025-12-05",
    "numberOfGuests": 2,
    "specialRequests": "Late checkout",
    "totalPrice": 7996.0
  }'
```

**Expected Response:**
```json
{
  "id": "abc123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "roomType": "deluxe",
  "numberOfGuests": 2,
  "checkInDate": "2025-12-01",
  "checkOutDate": "2025-12-05",
  "totalPrice": 7996.0,
  "status": "PENDING"
}
```

---

### 6. Get All Bookings (Auth Required)
```bash
TOKEN="your_token_here"

curl http://localhost:8001/api/bookings \
  -H "Authorization: Bearer $TOKEN"
```

---

## **Method 4: Test with Swagger UI (Interactive)**

### Access Swagger
Open in browser:
```
http://localhost:8001/api/swagger-ui.html
```

### How to Use Swagger:
1. Click on any endpoint to expand it
2. Click "Try it out"
3. Fill in the request body/parameters
4. Click "Execute"
5. See the response below

### For Authenticated Endpoints:
1. First call `/api/auth/login` or `/api/auth/register` to get a token
2. Click "Authorize" button at the top
3. Enter: `Bearer your_token_here`
4. Click "Authorize"
5. Now you can test protected endpoints

---

## **Method 5: Test with MongoDB Shell**

### Access MongoDB:
```bash
mongosh guesthub_db
```

### View All Collections:
```javascript
show collections
// Should show: users, rooms, bookings
```

### View All Users:
```javascript
db.users.find().pretty()
```

### View All Bookings:
```javascript
db.bookings.find().pretty()
```

### Count Documents:
```javascript
db.users.countDocuments()
db.bookings.countDocuments()
db.rooms.countDocuments()
```

### Delete All Bookings (for testing):
```javascript
db.bookings.deleteMany({})
```

---

## **Method 6: Check Service Status**

### View All Services:
```bash
sudo supervisorctl status
```

Should show:
- `springboot` - RUNNING ✅
- `vite_frontend` - RUNNING ✅
- `mongodb` - RUNNING ✅

### View Backend Logs:
```bash
# Real-time logs
tail -f /var/log/supervisor/springboot.out.log

# Last 100 lines
tail -100 /var/log/supervisor/springboot.out.log

# Error logs
tail -f /var/log/supervisor/springboot.err.log
```

### View Frontend Logs:
```bash
tail -f /var/log/supervisor/vite_frontend.out.log
```

---

## **Common Test Scenarios**

### Scenario 1: Guest Booking Flow
1. Open frontend in browser
2. Go to "Book Now" page
3. Fill in booking details
4. Submit booking
5. Check MongoDB to verify: `db.bookings.find().pretty()`

### Scenario 2: User Registration & Login
1. Register a new user via API or frontend
2. Login with credentials
3. Get JWT token
4. Use token to access protected endpoints

### Scenario 3: Admin Managing Rooms
1. Register an admin user (role: "admin")
2. Login to get token
3. Create rooms via API with admin token
4. View rooms (no auth needed)
5. Update/Delete rooms (admin token required)

---

## **Troubleshooting Tests**

### Backend Not Responding:
```bash
# Check if backend is running
sudo supervisorctl status springboot

# Restart backend
sudo supervisorctl restart springboot

# Check logs
tail -100 /var/log/supervisor/springboot.err.log
```

### MongoDB Connection Issues:
```bash
# Check MongoDB status
sudo supervisorctl status mongodb

# Restart MongoDB
sudo supervisorctl restart mongodb
```

### Frontend Not Loading:
```bash
# Check frontend status
sudo supervisorctl status vite_frontend

# Restart frontend
sudo supervisorctl restart vite_frontend

# Check logs
tail -100 /var/log/supervisor/vite_frontend.err.log
```

---

## **Expected Test Results**

### ✅ Successful Tests:
- User registration returns JWT token
- Login returns JWT token
- Guest bookings work without authentication
- Protected endpoints require valid JWT
- MongoDB stores data correctly
- Frontend loads and connects to backend
- Swagger UI is accessible

### ❌ Common Issues:
- **401 Unauthorized**: Token missing or invalid
- **403 Forbidden**: User doesn't have required role
- **500 Internal Server Error**: Check backend logs
- **Connection Refused**: Service not running

---

## **Quick Health Check**

Run this to verify everything is working:
```bash
echo "1. Backend Health:"
curl -s http://localhost:8001/api/rooms && echo "✅ Backend OK" || echo "❌ Backend Down"

echo ""
echo "2. MongoDB Health:"
mongosh --eval "db.adminCommand('ping')" guesthub_db && echo "✅ MongoDB OK" || echo "❌ MongoDB Down"

echo ""
echo "3. Frontend Health:"
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend OK" || echo "❌ Frontend Down"

echo ""
echo "4. Services Status:"
sudo supervisorctl status | grep -E "(springboot|vite_frontend|mongodb)"
```

---

## **Testing Checklist**

- [ ] Backend running on port 8001
- [ ] Frontend running on port 3000
- [ ] MongoDB running on port 27017
- [ ] User registration works
- [ ] User login returns JWT token
- [ ] Guest bookings work (no auth)
- [ ] Protected endpoints require auth
- [ ] Swagger UI accessible
- [ ] Frontend loads in browser
- [ ] Can create bookings via frontend
- [ ] Data persists in MongoDB

---

## **Need Help?**

- **Logs**: Check `/var/log/supervisor/` for all service logs
- **Swagger**: Use interactive API testing at `http://localhost:8001/api/swagger-ui.html`
- **MongoDB**: Use `mongosh guesthub_db` to query data
- **Test Script**: Run `/app/TEST_APIS.sh` for automated testing

---

**Happy Testing! 🎉**
