# Project Management System

This is a full-stack MERN application that implements user authentication and task update management.

Users can:
- Register and login securely
- Authenticate using JWT
- Access protected dashboard
- Perform CRUD operations on task updates

Tech Stack:
- React.js (Frontend)
- Node.js + Express (Backend)
- MongoDB Atlas
- JWT Authentication
- bcrypt password hashing

---

## How to Run

### 1️⃣ Backend

cd backendfinal  
npm install  
node index.js  

Backend runs on: http://localhost:8000

---

### 2️⃣ Frontend

cd frontend  
npm install  
npm start  

Frontend runs on: http://localhost:3000

---

Make sure:
- MongoDB Atlas connection string is added in backend .env file
- REACT_APP_API_URL is set in frontend .env file
