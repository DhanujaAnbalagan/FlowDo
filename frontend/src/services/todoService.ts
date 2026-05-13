import api from '@/lib/api';
import { Todo, TodoListResponse, TodoResponse } from '@/types/todo';

export const todoService = {
  getTodos: async (userId: number) => {
    const response = await api.get<TodoListResponse>(
      `/api/todos?filters[user][id][$eq]=${userId}&populate=*`
    );
    return response.data;
  },

  createTodo: async (title: string, userId: number) => {
    const response = await api.post<TodoResponse>('/api/todos', {
      data: {
        title,
        isCompleted: false,
        user: userId,
      },
    });
    return response.data;
  },

  updateTodo: async (documentId: string, isCompleted: boolean) => {
    const response = await api.put<TodoResponse>(`/api/todos/${documentId}`, {
      data: {
        isCompleted,
      },
    });
    return response.data;
  },

  deleteTodo: async (documentId: string) => {
    await api.delete(`/api/todos/${documentId}`);
  },
};
