'use client';

import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => Promise<unknown>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsSubmitting(true);
    try {
      await onAdd(trimmedTitle);
      setTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        id="todo-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
        disabled={isSubmitting}
      />
      <button
        id="add-todo-button"
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2 whitespace-nowrap"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <span className="text-xl">+</span>
            Add Task
          </>
        )}
      </button>
    </form>
  );
}
