# Scalable Web App with Authentication & Dashboard

This project is a scalable web application built with a React frontend (Vite + Tailwind CSS) and a Node.js/Express backend (MongoDB).

## Features
-   **Authentication**: User signup and login with JWT and bcrypt.
-   **Dashboard**: Protected route displaying user-specific tasks.
-   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
-   **Search & Filter**: Filter tasks by status and search by title/description.
-   **Responsive Design**: Built with Tailwind CSS for mobile and desktop.

## Prerequisites
-   Node.js installed.
-   MongoDB URI (configured in `server/.env`).

## Setup Instructions

### 1. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Start the backend server:
```bash
npm run dev
```
The backend runs on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal, navigate to the `client` directory and install dependencies:
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend runs on `http://localhost:5173`.

## Live Demo
-   **Frontend (Vercel)**: [https://my-app-frontend.vercel.app](https://my-app-frontend.vercel.app) *(Replace with your actial Vercel URL)*
-   **Backend (Render)**: [https://my-app-backend-53rz.onrender.com](https://my-app-backend-53rz.onrender.com)

## Documentation & Delliverables
-   **Scalability Report**: [SCALABILITY.md](./SCALABILITY.md)
-   **Postman Collection**: [postman_collection.json](./postman_collection.json)
-   **Verification Guide**: [walkthrough.md](./walkthrough.md)

## API Endpoints
-   `POST /api/auth/signup`: Register a new user.
-   `POST /api/auth/login`: Login user.
-   `GET /api/auth/me`: Get current user.
-   `GET /api/tasks`: Get all tasks for user.
-   `POST /api/tasks`: Create a new task.
-   `PUT /api/tasks/:id`: Update a task.
-   `DELETE /api/tasks/:id`: Delete a task.
-   `PUT /api/users/profile`: Update user profile.
