# FlowDo

FlowDo is a professional, secure, and high-performance task management application built with a modern full-stack architecture. It leverages the power of **Next.js 16** for a blazing-fast frontend and **Strapi v5** for a robust, headless backend.

## 🚀 Features

- **Secure Authentication**: Fully integrated JWT-based authentication system.
- **Data Isolation**: Advanced server-side logic ensures users can only access and manage their own tasks.
- **Optimistic UI**: Snappy user experience with immediate UI updates for task completion and deletion.
- **Modern Dashboard**: A clean, responsive interface designed for productivity.
- **Route Protection**: Robust client and server-side route guarding using Next.js Proxy middleware.
- **TypeScript**: End-to-end type safety for a reliable developer experience.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Session Management**: [js-cookie](https://github.com/js-cookie/js-cookie)

### Backend
- **Framework**: [Strapi v5](https://strapi.io/) (Headless CMS)
- **Database**: SQLite (Development)
- **Authentication**: JWT (Users-Permissions Plugin)

## 📦 Project Structure

```text
FlowDo/
├── frontend/             # Next.js 16 application
│   ├── src/app/          # App Router pages (Auth, Dashboard)
│   ├── src/components/   # Reusable UI components
│   ├── src/store/        # Zustand auth state
│   ├── src/hooks/        # Custom Todo logic
│   └── src/proxy.ts      # Route protection middleware
└── backend/              # Strapi v5 application
    ├── src/api/todo/     # Todo API with custom ownership logic
    └── config/           # Strapi configuration
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 20.x or later
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run develop
```
The backend will run at `http://localhost:1337`.

### 2. Frontend Setup
Create a `frontend/.env.local` file:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Then run the development server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:3000`.

## 🛡️ Security

FlowDo implements strict security measures:
- **JWT Persistence**: Tokens are stored securely in cookies for middleware-level route protection.
- **Server-Side Validation**: Strapi controllers are customized to override default CRUD behavior, enforcing that every request is filtered by the authenticated user's ID.
- **Environment Safety**: Sensitive URLs and keys are managed via environment variables.

## 📄 License

This project is developed as part of a professional internship assignment. All rights reserved.
