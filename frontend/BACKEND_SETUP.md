# Backend Setup (Spring Boot)

Commands
- cd backend
- Build: mvn clean package
- Run (dev, H2, port 8081): mvn spring-boot:run
- Profile prod (Postgres): mvn spring-boot:run -Dspring-boot.run.profiles=prod

Environment
- JWT_SECRET required in production; optional in dev (defaults provided).
- For Postgres profile, set DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD.

API
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Rooms: GET /api/rooms, GET /api/rooms/{id}, POST/PUT/DELETE (admin/management)
- Bookings: GET /api/bookings (role-aware), POST /api/bookings, DELETE /api/bookings/{id} (admin/management)

CORS
- Allowed origin: http://localhost:8080
