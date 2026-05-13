# FlowDo

<<<<<<< HEAD
A full-stack Todo application built with Next.js 16 and Strapi v5 featuring JWT authentication, protected routes, and user-specific task management.
=======
A full-stack Todo application built with Next.js 16 and Strapi v5 featuring JWT authentication, protected routes, and user-specific task management built with a modern full-stack architecture. It leverages the power of **Next.js 16** for a blazing-fast frontend and **Strapi v5** for a robust, headless backend.
>>>>>>> 61606d1df53c9192b329bd414895c23c94368ea0

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Protected Dashboard Routes
- User-specific Todo Management
- Create, Update, and Delete Todos
- Persistent Login Sessions
- Responsive Dashboard UI
- Loading and Error States
- Zustand-based State Management
- Modular Frontend Architecture

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Session Handling:** js-cookie

### Backend
- **Framework:** Strapi v5
- **Database:** SQLite
- **Authentication:** JWT (Users & Permissions Plugin)

---

## 📦 Project Structure

```text
FlowDo/
├── frontend/
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Axios configuration
│   │   ├── services/         # API services
│   │   ├── store/            # Zustand state management
│   │   └── types/            # TypeScript types
│   └── src/proxy.ts          # Route protection
│
├── backend/
│   ├── src/api/todo/         # Todo collection type
│   ├── src/extensions/       # Strapi extensions
│   └── config/               # Strapi configuration
│
├── README.md
└── .gitignore
```

## 🔐 Authentication Flow
- User registers using email and password.
- Strapi returns a JWT token after login.
- JWT is stored using cookies and Zustand persistence.
- Protected routes verify authentication state.
- Unauthenticated users are redirected to `/signin`.

## ✅ Todo Features
### Create Todo
Users can create new tasks from the dashboard.

### Read Todos
Users can view only their own tasks.

### Update Todo Status
Tasks can be toggled between pending and completed.

### Delete Todo
Tasks can be permanently removed.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- npm

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm run develop
```
Backend runs on: `http://localhost:1337`

### 2️⃣ Frontend Setup
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```
Then run:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/local/register`
- `POST /api/auth/local`

### Todos
- `GET    /api/todos`
- `POST   /api/todos`
- `PUT    /api/todos/:id`
- `DELETE /api/todos/:id`

---

## 🛡️ Security
- JWT authentication for protected APIs
- Route protection using Next.js Proxy middleware
- User-specific Todo filtering
- Environment variables for configuration
- Authenticated-only CRUD permissions in Strapi

## 📱 Responsive Design
FlowDo is fully responsive and supports:
- Desktop
- Tablet
- Mobile devices

## 🧪 Manual Test Flow
The application has been tested for:
- User Registration
- User Login
- Session Persistence
- Protected Route Redirection
- Todo Creation
- Todo Completion Toggle
- Todo Deletion
- Data Persistence After Refresh

## 🚧 Future Improvements
- Drag & Drop Task Ordering
- Due Dates & Reminders
- Dark Mode
- Search & Filters
- Deployment with PostgreSQL

## 👨💻 Author
**Dhanuja A**

Built as part of a Full-Stack Engineering Internship Assignment.

## 📄 License
This project was developed for educational and internship evaluation purposes.
