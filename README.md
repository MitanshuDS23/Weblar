```
# 📝 Task Manager App

---

## 📌 Project Overview
This is a full-stack Kanban-style task management system designed to help teams assign, track, and update tasks efficiently. Users can create tasks, assign them to specific team members, move them across stages (To Do → In Progress → Done), and view a live activity log of all changes in real-time with socket.io.

The app supports drag-and-drop between columns and ensures only the assigned user can update or move their tasks, maintaining accountability and workflow integrity.

---

## 🛠 Tech Stack Used
- **Frontend:** React, react-beautiful-dnd, axios, socket.io-client, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO
- **Authentication:** JWT-based login and protected routes
- **Styling:** CSS modules
- **Deployment:** Netlify (frontend), Render/AWS/Heroku (backend, choose based on your hosting)

---

## ⚙️ Setup and Installation Instructions

### 📦 Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud URI)
  
### 🔧 Backend
1. Navigate to the `backend/` directory.
2. Install dependencies:
```

npm install

```
3. Set your environment variables (e.g., MongoDB URI, JWT secret) in a `.env` file:
```

MONGO\_URI=your-mongodb-uri
JWT\_SECRET=your-jwt-secret

```
4. Start the backend server:
```

npm start

```
5. The backend should now run on [http://localhost:5000](http://localhost:5000).

### 💻 Frontend
1. Navigate to the `frontend/` directory.
2. Install dependencies:
```

npm install

```
3. Start the React app:
```

npm start

```
4. The frontend should now run on [http://localhost:3000](http://localhost:3000).

---

## 🚀 Features List and Usage Guide

✅ **User Registration & Login**  
- Register a new account or log in with existing credentials.  
- JWT-based authentication protects API routes.

✅ **Task Creation**
- Any authenticated user can create a task with a title, description, priority, and assignment.

✅ **Task Assignment**
- Assign tasks manually or use Smart Assign (see below).

✅ **Kanban Board**
- Tasks appear under To Do, In Progress, and Done columns.
- Tasks can be moved between stages with drag-and-drop, but only by their assignees.

✅ **Update Button**
- Assigned users see an “Update” button on their tasks to move them forward in the workflow.

✅ **Smart Assign**
- Auto-assigns a task to the user with the fewest active tasks.

✅ **Activity Log**
- View a real-time log of all actions: created tasks, status updates, assignments, etc.

✅ **Conflict Handling**
- Only the assigned user can move or update their tasks; conflicts with simultaneous edits are handled using optimistic locking (task versioning).

---

## ⚡ Explanations for Smart Assign and Conflict Handling Logic

### 🔹 Smart Assign
- When a user clicks **Smart Assign**, the backend counts the number of active tasks (tasks not in Done) for each user.
- It selects the user with the fewest active tasks and assigns the task to them.
- This balances workload automatically across team members.

### 🔹 Conflict Handling
- Each task has a `version` field (optimistic locking).
- When updating or moving a task, the client sends the current version number along with the request.
- The backend compares the version; if it doesn’t match the database value, it rejects the update, indicating a conflict (another user has changed the task).
- This prevents overwriting someone else’s updates and keeps task data consistent.

---

## 🌐 Link to Deployed Live App and Demo Video

🔗 **Live App:** [https://your-task-manager.netlify.app/](https://your-task-manager.netlify.app/)  
🎥 **Demo Video:** [Watch on YouTube](https://youtu.be/your-demo-video-id)

---

🎉 **Enjoy managing your tasks efficiently and collaboratively!**
```
