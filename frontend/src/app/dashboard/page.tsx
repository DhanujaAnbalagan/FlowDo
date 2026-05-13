'use client';

import { useAuthStore } from '@/store/authStore';
import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        {mounted && (
          <p className="text-gray-500">
            Welcome back, <span className="font-semibold text-indigo-600">{user?.username}</span>. 
            You have {todos.filter(t => !t.isCompleted).length} pending tasks.
          </p>
        )}
      </header>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 flex justify-between items-center">
          <span>{error}</span>
        </div>
      )}

      <TodoForm onAdd={addTodo} />

      <TodoList 
        todos={todos} 
        loading={loading} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
      
      <footer className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
        FlowDo Dashboard &bull; Securely synced with Strapi v5
      </footer>
    </div>
  );
}
