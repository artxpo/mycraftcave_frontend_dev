import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { Cat } from '../models/Cat';
import { TodoResponse } from '../models/TodoResponse';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseUrl}/todos`);
  }

  getCatService(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${baseUrl}/catfact`);
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
