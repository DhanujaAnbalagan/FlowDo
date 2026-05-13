export interface Todo {
  id: number;
  documentId: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TodoResponse {
  data: Todo;
}

export interface TodoListResponse {
  data: Todo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
