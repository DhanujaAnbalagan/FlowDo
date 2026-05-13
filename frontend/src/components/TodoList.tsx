import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
  todos: Todo[];
  onToggle: (documentId: string, currentStatus: boolean) => Promise<void>;
  onDelete: (documentId: string) => Promise<void>;
  loading: boolean;
}

export default function TodoList({ todos, onToggle, onDelete, loading }: TodoListProps) {
  if (loading && todos.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return <EmptyState />;
  }

  // Sort: pending first, then by creation date
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.documentId}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
