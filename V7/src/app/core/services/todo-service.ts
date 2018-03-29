import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TodoModel } from '../../models/todo.model';

import { environment } from '../../../environments/environment';
@Injectable()
export class TodoService {
  todos: TodoModel[]; // 데이터 중개를 담당하는 서비스가 싱글턴이여야 한다.
  url = environment.url;
  toggleAll = false;

  constructor(public http: HttpClient) {
    this.getTodos();
  }
  getTodos() {
    this.http
      .get<TodoModel[]>(this.url)
      .subscribe(todos => (this.todos = todos));
  }

  addTodo(content) {
    const payload = { id: this.lastTodoId(), content, completed: false };
    this.http
      .post(this.url, payload)
      .subscribe(
        todos =>
          (this.todos = [
            { id: this.lastTodoId(), content, completed: false },
            ...this.todos
          ])
      );
  }
  lastTodoId(): number {
    return this.todos.length
      ? Math.max(...this.todos.map(({ id }) => id)) + 1
      : 1;
  }

  removeTodo(id: number) {
    this.http
      .delete(`${this.url}/id/${id}`, { responseType: 'text' })
      .subscribe(
        () => (this.todos = this.todos.filter(todo => todo.id !== id))
      );
  }
  toggleComplete(todo) {
    this.http
      .patch(
        `${this.url}/id/${todo.id}`,
        { completed: !todo.completed },
        { responseType: 'text' }
      )
      .subscribe(() => this.getTodos());
  }
  toggleAllTodoAsComplete(completed: boolean) {
    this.toggleAll = !this.toggleAll;
    this.http
      .patch(this.url, { completed: this.toggleAll }, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }
  removeCompletedTodos() {
    this.http
      .delete(`${this.url}/completed`, { responseType: 'text' })
      .subscribe(
        () => (this.todos = this.todos.filter(todo => !todo.completed))
      );
  }
  getCntCompletedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getCntActiveTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }
}
