import { Todo } from './Todo';

export interface TodoResponse {
  message: string;
  todo: Todo;
  todos: Todo[];
}
