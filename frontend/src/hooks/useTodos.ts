import { useState, useEffect, useCallback } from 'react';
import { todoService } from '@/services/todoService';
import { Todo } from '@/types/todo';
import { useAuthStore } from '@/store/authStore';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, jwt } = useAuthStore();

  const fetchTodos = useCallback(async () => {
    if (!user || !jwt) return;
    setLoading(true);
    setError(null);
    try {
      const response = await todoService.getTodos(user.id);
      setTodos(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [user, jwt]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    if (!user) return;
    try {
      const response = await todoService.createTodo(title, user.id);
      setTodos((prev) => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
      throw err;
    }
  };

  const toggleTodo = async (documentId: string, currentStatus: boolean) => {
    try {
      // Optimistic update
      setTodos((prev) =>
        prev.map((t) => (t.documentId === documentId ? { ...t, isCompleted: !currentStatus } : t))
      );
      await todoService.updateTodo(documentId, !currentStatus);
    } catch (err: any) {
      // Revert optimistic update
      setTodos((prev) =>
        prev.map((t) => (t.documentId === documentId ? { ...t, isCompleted: currentStatus } : t))
      );
      setError(err.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (documentId: string) => {
    try {
      // Optimistic delete
      const originalTodos = [...todos];
      setTodos((prev) => prev.filter((t) => t.documentId !== documentId));
      await todoService.deleteTodo(documentId);
    } catch (err: any) {
      // Revert if failed (requires refetch or local revert)
      fetchTodos();
      setError(err.message || 'Failed to delete todo');
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refresh: fetchTodos,
  };
};
