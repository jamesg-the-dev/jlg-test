import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Task, TaskFormData } from '../models/task.model';
import { TodoResponse, CreateTodoRequest } from '../models/http-models/todo.model';
import { mapTodoResponseToTask, priorityToServer } from '../utilities/task.util';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/todos`;

  getAll(): Observable<Task[]> {
    return this.http
      .get<TodoResponse[]>(this.base)
      .pipe(map((todos) => todos.map(mapTodoResponseToTask)));
  }

  create(data: TaskFormData): Observable<Task> {
    const payload: CreateTodoRequest = {
      title: data.title,
      dueDate: data.dueDate || null,
      priority: priorityToServer(data.priority),
      category: data.category || null,
    };

    return this.http.post<TodoResponse>(this.base, payload).pipe(map(mapTodoResponseToTask));
  }

  setCompleted(id: number, completed: boolean): Observable<Task> {
    const url = `${this.base}/${id}/${completed ? 'complete' : 'incomplete'}`;
    return this.http.patch<TodoResponse>(url, {}).pipe(map(mapTodoResponseToTask));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
