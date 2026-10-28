# UserHub — Requirements and Implemented Features

| # | Feature | Status |
|---|---|---|
| 1 | User Registration | Implemented |
| 2 | Password Hashing | Implemented |
| 3 | User Login (Token Auth) | Implemented |
| 4 | Role-Based Authorization | Implemented |
| 5 | Protected User Dashboard | Implemented |
| 6 | Protected Routes (Frontend) | Implemented |
| 7 | Exception Handling | Implemented |
| 8 | Seed an ADMIN User | Pending |
| 9 | Admin Users Page | Pending |
| 10 | Server-Side Logout | Pending |
| 11 | Edit My Profile | Pending |

## 1. User Registration
- **Description:** New users sign up with full name, email and password.
- **Expected behavior:** Validates input (name not blank, valid email, password at least 8 characters). Duplicate email is rejected. New accounts get the USER role.
- **Endpoint:** `POST /api/auth/register` → 201 Created, 400 invalid input, 409 email already used
- **Status:** Implemented

## 2. Password Hashing
- **Description:** Passwords are never stored in plain text.
- **Expected behavior:** Passwords are hashed with SHA-256 before saving. Responses never include the password.
- **Endpoint:** n/a (used by register and login)
- **Status:** Implemented

## 3. User Login (Token Authentication)
- **Description:** Users log in with email and password.
- **Expected behavior:** On success returns a random UUID token and user info. Wrong email or password returns the same error. The frontend stores the token and sends it as `Authorization: Bearer <token>`.
- **Endpoint:** `POST /api/auth/login` → 200 OK, 401 invalid credentials
- **Status:** Implemented

## 4. Role-Based Authorization
- **Description:** Access depends on the user's role (USER or ADMIN).
- **Expected behavior:** Missing or invalid token returns 401. Wrong role returns 403.
- **Endpoint:** `GET /api/dashboard/users` (ADMIN only)
- **Status:** Implemented

## 5. Protected User Dashboard
- **Description:** A personal page for logged-in users.
- **Expected behavior:** Shows full name, email, role, member-since date and total users.
- **Endpoint:** `GET /api/dashboard` → 200 OK, 401 without token
- **Status:** Implemented

## 6. Protected Routes (Frontend)
- **Description:** React Router guards pages.
- **Expected behavior:** No token redirects to `/login`. Wrong role redirects to `/dashboard`. Unknown paths redirect to `/login`.
- **Endpoint:** n/a
- **Status:** Implemented

## 7. Exception Handling
- **Description:** Errors are turned into clean HTTP responses.
- **Expected behavior:** JSON body `{"error": "..."}` with status 400, 401, 403 or 409.
- **Endpoint:** all
- **Status:** Implemented

## 8. Seed an ADMIN User (10 pts)
- **Description:** A default admin account is created on startup using CommandLineRunner.
- **Expected behavior:** Admin can log in after every restart (the database is in-memory).
- **Endpoint:** `POST /api/auth/login` with the admin credentials
- **Status:** Pending

## 9. Admin Users Page (15 pts)
- **Description:** ADMIN-only page listing all registered users.
- **Expected behavior:** Admin sees a table of id, name, email and role. Non-admins get 403 from the API and are redirected by the frontend.
- **Endpoint:** `GET /api/dashboard/users`
- **Status:** Pending

## 10. Server-Side Logout (10 pts)
- **Description:** Logout invalidates the token on the server.
- **Expected behavior:** The token is removed from the session map; reusing it returns 401.
- **Endpoint:** `POST /api/auth/logout`
- **Status:** Pending

## 11. Edit My Profile (15 pts)
- **Description:** Authenticated users can update their full name.
- **Expected behavior:** The name is saved, validated (not blank) and shown on the dashboard.
- **Endpoint:** `PUT /api/users/me`
- **Status:** Pending