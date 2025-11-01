# Quick Start Guide 🚀

## Access Your Application

### Frontend (React + Vite)
- **URL**: https://sql-spring-layer.preview.emergentagent.com
- **Local**: http://localhost:3000

### Backend (Spring Boot)
- **API Base**: https://sql-spring-layer.preview.emergentagent.com/api
- **Local**: http://localhost:8001/api

### API Documentation (Swagger)
- **Swagger UI**: http://localhost:8001/api/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8001/api/v3/api-docs

---

## Quick Commands

### Service Management
```bash
# Check status
sudo supervisorctl status

# Restart backend
sudo supervisorctl restart springboot

# Restart frontend
sudo supervisorctl restart vite_frontend

# Restart all services
sudo supervisorctl restart all

# View backend logs
tail -f /var/log/supervisor/springboot.out.log

# View frontend logs
tail -f /var/log/supervisor/vite_frontend.out.log
```

### Rebuild Backend
```bash
cd /app/backend
mvn clean package -DskipTests
sudo supervisorctl restart springboot
```

### Rebuild Frontend
```bash
cd /app/frontend
yarn install
sudo supervisorctl restart vite_frontend
```

---

## Test the APIs

### Create a User
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@hotel.com",
    "password": "guest123",
    "name": "Guest User",
    "role": "guest"
  }'
```

### Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@hotel.com",
    "password": "guest123"
  }'
```

### Create Booking (No Auth)
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
    "totalPrice": 7996.0
  }'
```

---

## MongoDB Commands

### Access MongoDB Shell
```bash
mongosh guesthub_db
```

### View Collections
```javascript
show collections
```

### Query Users
```javascript
db.users.find().pretty()
```

### Query Bookings
```javascript
db.bookings.find().pretty()
```

### Count Documents
```javascript
db.users.countDocuments()
db.bookings.countDocuments()
db.rooms.countDocuments()
```

---

## Development

### Hot Reload
- **Frontend**: Changes auto-reload ✅
- **Backend**: Requires rebuild & restart

### Environment Variables

**Backend** (`/app/backend/.env`):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=guesthub_db
JWT_SECRET=devsecretchangemeinproductionenvironmentlongsecret
```

**Frontend** (`/app/frontend/.env`):
```
VITE_BACKEND_URL=https://sql-spring-layer.preview.emergentagent.com
VITE_API_BASE_URL=https://sql-spring-layer.preview.emergentagent.com/api
```

---

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
tail -100 /var/log/supervisor/springboot.err.log

# Check if MongoDB is running
sudo supervisorctl status mongodb

# Restart backend
sudo supervisorctl restart springboot
```

### Frontend Issues
```bash
# Check logs
tail -100 /var/log/supervisor/vite_frontend.err.log

# Reinstall dependencies
cd /app/frontend
rm -rf node_modules
yarn install

# Restart frontend
sudo supervisorctl restart vite_frontend
```

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo supervisorctl status mongodb

# Restart MongoDB
sudo supervisorctl restart mongodb

# Check MongoDB logs
tail -100 /var/log/mongodb.out.log
```

---

## Tech Stack Summary

**Backend:**
- Spring Boot 3.3.4
- Java 17
- Maven
- MongoDB
- JWT Authentication
- Swagger/OpenAPI

**Frontend:**
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Radix UI

**Database:**
- MongoDB 7.x

---

## Important Files

```
/app/
├── backend/
│   ├── src/main/java/com/guesthub/
│   ├── src/main/resources/application.yml
│   ├── pom.xml
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── MIGRATION_COMPLETE.md
└── QUICK_START.md (this file)
```

---

## Useful Links

- **Spring Boot**: https://spring.io/projects/spring-boot
- **MongoDB**: https://www.mongodb.com/docs/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/

---

**Happy Coding! 🎉**
