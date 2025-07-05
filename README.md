```
# 📝 Task Manager App

---

## 📌 Project Overview
This is a full-stack Kanban-style task management system that enables team members to create tasks, assign them to users, move tasks through stages (To Do → In Progress → Done), and view a live activity log of all changes. The system supports drag-and-drop functionality, real-time updates with Socket.IO, and secure authentication, ensuring that only assigned users can interact with their tasks.

---

## 🛠 Tech Stack Used
- **Frontend (in `/frontend` directory):** React, react-beautiful-dnd, axios, socket.io-client, React Router
- **Backend (in `/backend` directory):** Node.js, Express, MongoDB (Mongoose), Socket.IO
- **Authentication:** JWT-based authentication with protected routes
- **Styling:** CSS modules
- **Deployment:** Netlify (frontend), Render/AWS/Heroku (backend)

---

## ⚙️ Setup and Installation Instructions

### 📦 Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud URI)

### 🔧 Backend Setup (in `/backend` directory)
1. Navigate to the backend directory:
```
```
cd backend
```


2. Install dependencies:

```
npm install

```
3. Create a `.env` file with your configuration:

```
MONGO\_URI=your-mongodb-uri
JWT\_SECRET=your-jwt-secret

```
4. Start the backend server:

```
npm start

```
5. The backend should now run on [http://localhost:5000](http://localhost:5000).

### 💻 Frontend Setup (in `/frontend` directory)
1. Open a new terminal and navigate to the frontend directory:
```

cd frontend

```
2. Install dependencies:
```

npm install

```
3. Start the React development server:
```

npm start

```
4. The frontend should now run on [http://localhost:3000](http://localhost:3000).

---

## 🚀 Features List and Usage Guide

✅ **User Registration & Login**  
Secure JWT-based registration and login allow authenticated access to the board and API.

✅ **Task Creation**  
Users can create tasks with a title, description, and priority.

✅ **Manual & Smart Assignment**  
Tasks can be manually assigned to specific users or automatically assigned to the team member with the fewest active tasks using Smart Assign.

✅ **Kanban Board View**  
Tasks are organized in three columns: To Do, In Progress, and Done. Users can collapse or expand columns as needed.

✅ **Drag and Drop**  
Tasks can be moved between columns via drag-and-drop. Only the assigned user can move their tasks.

✅ **Update Button**  
Assigned users see an “Update” button on their tasks when they are in To Do or In Progress stages, allowing them to advance the task to the next stage without dragging.

✅ **Activity Log**  
All actions (task creation, assignment, updates, deletions) are logged and displayed in a real-time activity log.

✅ **Real-Time Collaboration**  
All changes are broadcast live to all users through Socket.IO, ensuring everyone sees updates immediately.

✅ **Conflict Handling**  
Each task uses a version field for optimistic locking. When a user updates a task, the backend checks if the version matches; if not, it rejects the update to prevent overwriting concurrent changes.

---

## ⚡ Explanations for Smart Assign and Conflict Handling Logic

### 🔹 Smart Assign
When a user clicks the **Smart Assign** button on a task, the backend queries all users and counts their active tasks (tasks not in Done). It assigns the task to the user with the fewest active tasks, balancing the workload automatically.

### 🔹 Conflict Handling
To avoid concurrent update issues, each task carries a `version` field. The frontend sends the task’s current version during updates. The backend compares it with the version in the database:  
- If they match, the update is allowed and the version is incremented.  
- If they don’t match, it means another user updated the task first, and the backend rejects the request, prompting the client to refresh task data.

---

## 🌐 Link to Deployed Live App and Demo Video

🔗 **Live App:** [https://your-task-manager.netlify.app/](https://your-task-manager.netlify.app/)  
🎥 **Demo Video:** [Watch on YouTube](https://youtu.be/your-demo-video-id)
```
