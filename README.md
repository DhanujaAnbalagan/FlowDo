# FlowDo

A full-stack Todo application built with Next.js 16 and Strapi v5 featuring JWT authentication, protected routes, and user-specific task management.

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

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- js-cookie

### Backend
- Strapi v5
- SQLite (Development)
- JWT Authentication (Users & Permissions Plugin)

## 📦 Project Structure

```text
FlowDo/
├── frontend/
│   ├── src/app/          # App Router pages
│   ├── src/components/   # Reusable UI components
│   ├── src/hooks/        # Custom hooks
│   ├── src/store/        # Zustand state management
│   ├── src/lib/          # Axios configuration
│   └── src/proxy.ts      # Route protection
│
├── backend/
│   ├── src/api/todo/     # Todo collection type
│   └── config/           # Strapi configuration
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- npm

### Backend Setup
```bash
cd backend
npm install
npm run develop
```
Backend runs at: `http://localhost:1337`

### Frontend Setup
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Run frontend:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

## 🔐 Authentication & Security
- JWT-based authentication
- Protected routes using Next.js Proxy middleware
- User-specific Todo filtering
- Persistent sessions using cookies and Zustand
- Environment variables for configuration

## ✅ Todo Features
- Create Todos
- View Personal Todos
- Toggle Completion Status
- Delete Todos
- Persistent Data After Refresh

## 📱 Responsive Design
Supports:
- Desktop
- Tablet
- Mobile

## 👨‍💻 Author
**Dhanuja A**

Built as part of a Full-Stack Engineering Internship Assignment.

## 📄 License
This project was developed for educational and internship evaluation purposes.
