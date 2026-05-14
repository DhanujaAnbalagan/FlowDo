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
      const response = await todoService.getTodos();
      // Strapi v5 returns { data: [...], meta: {...} }
      // todoService.getTodos returns response.data from axios
      setTodos(response.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [user, jwt]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    if (!user) return;
    try {
      const response = await todoService.createTodo(title, user.id);
      // Strapi v5 returns { data: { ... } }
      // todoService.createTodo returns response.data from axios
      const newTodo = response.data;
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
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
    } catch (err: unknown) {
      // Revert optimistic update
      setTodos((prev) =>
        prev.map((t) => (t.documentId === documentId ? { ...t, isCompleted: currentStatus } : t))
      );
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const deleteTodo = async (documentId: string) => {
    try {
      // Optimistic delete
      setTodos((prev) => prev.filter((t) => t.documentId !== documentId));
      await todoService.deleteTodo(documentId);
    } catch (err: unknown) {
      // Revert if failed (requires refetch or local revert)
      fetchTodos();
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
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
