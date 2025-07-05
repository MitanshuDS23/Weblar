# 📝 Task Manager App

---

## 📌 Project Overview
A full-stack Kanban-style task management system enabling team members to create tasks, assign them to users, move tasks through stages (To Do → In Progress → Done), and view a real-time activity log. The system supports drag-and-drop, live updates via Socket.IO, and secure authentication to ensure only assigned users can interact with their tasks.

---

## 🛠 Tech Stack Used
- **Frontend (`/frontend`):** React, react-beautiful-dnd, axios, socket.io-client, React Router
- **Backend (`/backend`):** Node.js, Express, MongoDB (Mongoose), Socket.IO
- **Authentication:** JWT-based authentication with protected routes
- **Styling:** CSS Modules
- **Deployment:Netlify (frontend), Render(backend)

---

## ⚙️ Setup and Installation Instructions

### 📦 Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or a cloud URI)

---

### 🔧 Backend Setup (`/backend`)
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with your configuration:
    ```env
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. The backend will run at [http://localhost:5000](http://localhost:5000).

---

### 💻 Frontend Setup (`/frontend`)
1. Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

4. The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## 🚀 Features List and Usage Guide

✅ **User Registration & Login**  
Secure JWT-based registration and login provide authenticated access to the board and API.

✅ **Task Creation**  
Create tasks with a title, description, priority, and optional assignee.

✅ **Manual & Smart Assignment**  
Assign tasks manually or use Smart Assign to automatically assign tasks to the user with the fewest active tasks.

✅ **Kanban Board View**  
Tasks are organized in three columns: To Do, In Progress, and Done. Columns can be expanded or collapsed.

✅ **Drag and Drop**  
Assigned users can move their tasks across stages via drag-and-drop.

✅ **Update Button**  
Assigned users see an “Update” button on tasks in To Do or In Progress, allowing them to advance tasks without dragging.

✅ **Activity Log**  
A real-time activity log displays task creation, updates, deletions, and assignments.

✅ **Real-Time Collaboration**  
All updates broadcast instantly to all connected users via Socket.IO.

✅ **Conflict Handling**  
Optimistic locking ensures consistent updates: the backend checks the task version during updates, preventing overwriting concurrent changes.

---

## ⚡ Explanations for Smart Assign and Conflict Handling Logic

### 🔹 Smart Assign
When **Smart Assign** is triggered, the backend queries all users and counts their active tasks (tasks not marked Done). The user with the fewest active tasks is selected and assigned the new task, distributing workload evenly.

### 🔹 Conflict Handling
Each task has a `version` field. The frontend includes the current version when updating a task. The backend compares it to the latest version in the database:
- If versions match, the update succeeds and the task’s version increments.
- If versions differ, it indicates another user updated the task first, so the backend rejects the request, avoiding conflicts.

---

## 🌐 Live App and Demo

🔗 **Live App:** [https://neon-peony-8e1b29.netlify.app/)  
🎥 **Demo Video:** [https://www.youtube.com/watch?v=OBm1Hd6TK6U)
