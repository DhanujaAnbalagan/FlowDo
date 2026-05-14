# FlowDo: Task Management Reimagined

FlowDo is a production-grade, full-stack task management application designed for speed, security, and seamless user experience. Built with a modern monorepo architecture, it leverages **Next.js 16** for a high-performance frontend and **Strapi v5** for a robust, secure backend.

---

## 🌐 Live Demo

- **Frontend Application**: [https://flow-do-frontend.vercel.app/](https://flow-do-frontend.vercel.app/)
- **Backend Admin Panel**: [https://flowdo-production.up.railway.app/admin](https://flowdo-production.up.railway.app/admin)

---

## 🚀 Key Features

- **Secure Authentication**: JWT-based registration and login system with encrypted password storage.
- **Protected Routing**: Advanced middleware-based route guarding to ensure only authenticated users access the dashboard.
- **Real-time CRUD**: Full Create, Read, Update, and Delete operations for tasks with immediate UI feedback.
- **Data Isolation**: Backend-enforced ownership ensures users only see and manage their own tasks.
- **Persistent Sessions**: Secure cookie-based session management that keeps you logged in across browser restarts.
- **Premium UI/UX**: A responsive, dark-mode-first design built for clarity and efficiency on all devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **API Client**: Axios with Interceptors
- **Auth Utils**: js-cookie

### Backend
- **Framework**: Strapi v5
- **Database**: SQLite (Production-ready on Railway)
- **API**: REST with Document Service integration
- **Security**: JWT Authentication & Role-Based Access Control

---

## 📦 Project Structure

```text
FlowDo/
├── frontend/             # Next.js Application
│   ├── src/app/          # Pages & Routing
│   ├── src/components/   # UI Components
│   ├── src/store/        # Zustand Auth Store
│   ├── src/lib/          # API & Middleware
│   └── src/middleware.ts # Route Protection logic
│
├── backend/              # Strapi CMS
│   ├── src/api/todo/     # Todo Collection Logic
│   ├── config/           # Server & Database Config
│   └── railway.json      # Deployment instructions
│
└── README.md             # Project Documentation
```

---

## ⚙️ Local Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run develop
```
*Backend will run at `http://localhost:1337`*

### 2. Frontend Setup
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Run the development server:
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run at `http://localhost:3000`*

---

## 🚀 Deployment

- **Frontend**: Deployed on **Vercel** utilizing a monorepo subfolder configuration.
- **Backend**: Deployed on **Railway** with a specialized startup configuration for Strapi v5.

---

## 🎬 Demo Flow

1.  **Landing Page**: Professional introduction with dynamic CTA buttons.
2.  **Registration**: Create a new account with immediate auto-login.
3.  **Dashboard**: Create, toggle completion, and delete tasks.
4.  **Security Check**: Attempting to visit `/dashboard` while logged out triggers an automatic redirect to `/signin`.
5.  **Persistence**: Log out and log back in to see your tasks exactly as you left them.

---

## 💡 Challenges Solved

- **Monorepo Routing**: Successfully configured Vercel to treat the `frontend` subdirectory as the root for seamless production deployments.
- **Middleware Architecture**: Implemented Next.js `middleware.ts` to provide a robust, server-side auth layer that works reliably in production environments.
- **Railway Stability**: Resolved complex startup and healthcheck issues on Railway by implementing custom `railway.json` configurations for subfolder-based Strapi apps.

---

## 👨‍💻 Author

**Dhanuja A**
*Full-Stack Developer | Engineering Intern*

---

## 📄 License
This project was developed for educational and internship evaluation purposes.
