


# 📝 ToDo API (Node.js + PostgreSQL)

A secure RESTful ToDo API built with Node.js, Express, PostgreSQL, and JWT authentication.

---

## 🚀 Features

- Email-based user authentication
- JWT protected routes
- CRUD operations for tasks
- Tasks scoped strictly to authenticated users
- Passwords stored securely using hashing
- Input validation and proper HTTP status codes

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- pg

---

## 📦 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Monishkumar15/todo-app-backend.git
cd todo-app-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a .env file using .env.example:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=project_abc
JWT_SECRET=your_secret
```
---
### Database Setup

```sql
CREATE DATABASE project_abc;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'todo',
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```
---
### ▶️ Run the Server

```bash
npm run dev
```
Server runs on:
```arduino
http://localhost:3000
```

---
### 🔐 API Endpoints
#### Auth (Public)
```http
POST /api/auth/register
POST /api/auth/login
```

#### Tasks (Protected)
```http
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```
---

### 🔑 Authentication

- Use JWT token in Authorization header:

```http
Authorization: Bearer <your_token>
```
---
## 🔄 How Routes Work (Request Flow)
request → middleware → controller → model → database → response

---

## 🔄 How Routes Work (Request Flow)

This project follows a clean layered architecture to handle API requests.

### Example: Create Task (`POST /api/tasks`)

1. **Client Request**
   - The client sends a request with task data and a JWT token in headers.

2. **Route Layer**
   - The request hits the route defined in `task.routes.js`.

3. **Authentication Middleware**
   - `auth.middleware.js` verifies the JWT.
   - Extracts the user ID and attaches it to `req.user`.
   - Rejects the request with `401 Unauthorized` if the token is invalid or missing.

4. **Controller Layer**
   - `task.controller.js` validates request body (title, status).
   - Ensures task belongs to the authenticated user.
   - Calls the model layer to perform database operations.

5. **Model Layer**
   - `task.model.js` executes SQL queries using PostgreSQL.
   - Handles data persistence and retrieval.

6. **Database**
   - Data is stored or retrieved from the `todos` table.

7. **Response**
   - A proper HTTP response is sent back (201 Created / 400 / 401 / 403 / 404).

---

### 🔐 Protected Route Flow

All task-related routes are protected using JWT authentication:



---
### 🧪 API Testing
API can be tested using:
- Postman
- curl

Example:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/tasks
```
---
### ❌ Out of Scope

The following routes are intentionally not implemented:
```http
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```
---
### ✅ Status

✔ Authentication<br>
✔ Authorization<br>
✔ Validation<br>
✔ Secure database access<br>


---

## 3️⃣ Working API (Postman / curl)

You already satisfy this ✅  
Just ensure:

### ✔ Register
```http
POST /api/auth/register
```

### ✔ Login
```http
POST /api/auth/login
```

### ✔ Use JWT
```http
Authorization: Bearer <token>
```

### ✔ Task CRUD

All routes working as expected with proper status codes.
