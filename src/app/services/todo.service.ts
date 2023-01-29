import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoResponse } from '../models/TodoResponse';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseUrl}/todos`);
  }

  create(data: Todo): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(`${baseUrl}/todos`, data);
  }

  delete(id: string): Observable<TodoResponse> {
    return this.http.delete<TodoResponse>(`${baseUrl}/todos/${id}`);
  }

  update(id: string, data: Todo): Observable<TodoResponse> {
    return this.http.put<TodoResponse>(`${baseUrl}/todos/${id}`, data);
  }
}
