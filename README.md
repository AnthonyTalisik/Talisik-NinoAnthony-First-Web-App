# UserHub — Full-Stack Web Application

UserHub is a simple user management application built with Spring Boot (backend) and ReactJS (frontend). It supports user registration, login with token-based authentication, role-based authorization (USER and ADMIN), a protected dashboard, an admin-only users page, server-side logout, and profile editing. Data is stored in an in-memory H2 database.

## Technologies Used

- **Backend:** Java 21, Spring Boot 4.x, Spring Web, Spring Data JPA, Bean Validation, H2 Database, Maven
- **Frontend:** ReactJS, Vite, React Router, Axios
- **Tools:** Git/GitHub, Postman, VS Code

## System Requirements

- JDK 21 or higher (`java -version`)
- Node.js LTS (`node -v`) and npm (`npm -v`)
- Git
- Postman (optional, for API testing)
- Windows PowerShell users: if `npm` is blocked, run
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.

## Project Structure

```
Talisik-NinoAnthony-First-Web-App/
├── backend/     Spring Boot source files
├── frontend/    ReactJS source files
├── docs/        REQUIREMENTS.md and screenshots/
└── README.md
```

## Setup and Running

### 1. Clone the repository

```
git clone https://github.com/AnthonyTalisik/Talisik-NinoAnthony-First-Web-App.git
cd Talisik-NinoAnthony-First-Web-App
```

### 2. Backend (Spring Boot)

```
cd backend
.\mvnw.cmd spring-boot:run        # Windows
./mvnw spring-boot:run            # macOS / Linux
```

Wait for `Tomcat started on port 8080`. Keep this terminal open.

### 3. Frontend (React)

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

## Application URLs and Ports

| Service | URL |
|---|---|
| React frontend | http://localhost:5173 |
| Spring Boot API | http://localhost:8080 |
| H2 console | http://localhost:8080/h2-console |

H2 console login: JDBC URL `jdbc:h2:mem:userhubdb`, user `sa`, empty password.

## Default Admin Account

An ADMIN user is created automatically at startup:

- Email: `<admin email>`
- Password: `<admin password>`

## How to Test

1. Open http://localhost:5173 and register a new account.
2. Log in; you are taken to the dashboard.
3. Edit your full name using the profile form.
4. Log out; the token is invalidated on the server.
5. Log in as the admin and open the Admin Users page to see all users.
6. Log in as a regular user and try `/admin/users`; you are redirected.

API checks (Postman or PowerShell):

| Request | Expected |
|---|---|
| POST /api/auth/register | 201 Created |
| Register same email again | 409 Conflict |
| Register with password under 8 characters | 400 Bad Request |
| POST /api/auth/login | 200 with token |
| GET /api/dashboard without token | 401 |
| GET /api/dashboard/users with USER token | 403 |
| GET /api/dashboard/users with ADMIN token | 200 |

## Additional Notes

- The H2 database is in-memory: all data and sessions reset when the backend restarts, so you must register or log in again.
- The backend allows requests from http://localhost:5173 (CORS). If you change the frontend port, update `@CrossOrigin` in the controllers.
- Passwords are hashed with SHA-256 (for learning purposes; production apps should use BCrypt).