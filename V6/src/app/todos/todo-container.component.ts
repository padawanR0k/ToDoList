import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  todos: Todo[];
  payload: Todo;

  constructor(public http: HttpClient) {}
  selectedNavItem = 'All';
  navItems = ['All', 'Active', 'Completed'];
  // 선택된 navigation item
  url = environment.url;
  completedTodosId: [];
  toggleTodo = false;
  toggleAll = false;
  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    // this.todos = [
    //   { id: 3, content: 'HTML', completed: false },
    //   { id: 2, content: 'CSS', completed: true },
    //   { id: 1, content: 'Javascript', completed: false }
    // ];
    console.log(this.http)
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  addTodo(content) {
    // this.todos = [
    //   { id: this.lastTodoId(), content, completed: false },
    //   ...this.todos
    // ];
    this.payload = { id: this.lastTodoId(), content, completed: false }
    this.http.post(this.url, this.payload,{'Content-Type': 'application/json'})
      .subscribe( todos => this.todos = [{ id: this.lastTodoId(), content, completed: false },...this.todos]);
  }

  removeTodo(id: number) {
    this.http.delete(`${this.url}/id/${id}`, { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => todo.id !== id))
  }

  removeCompletedTodos() {
    // this.todos = this.todos.filter(todo => todo.completed !== true);
    this.http.delete(`${this.url}/completed`,  { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed ));
  }

  toggleComplete(id: number) {
    // this.todos.forEach(todo => {
    //   todo = todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
    // });
    // this.todos = this.todos.map(todo => {
    //   return todo.id === id
    //     ? Object.assign(todo, { completed: !todo.completed })
    //     : todo;
    // });

    this.toggleTodo = !this.toggleTodo; 
    this.http.patch(`${this.url}/id/${id}`,{completed: this.toggleTodo},{ responseType: 'text'})
      .subscribe(() => this.getTodos());
  }

  toggleAllTodoAsComplete(completed: boolean) {
    // this.todos.forEach(todo => todo = Object.assign({}, todo, { completed }));
    // this.todos = this.todos.map(todo => Object.assign(todo, { completed }));

    this.toggleAll = !this.toggleAll 
    this.http.patch(this.url, {completed: this.toggleAll}, { responseType: 'text'})
      .subscribe(() => this.getTodos())
  }

  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
  }

  getCntCompletedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getCntActiveTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  lastTodoId(): number {
    return this.todos.length
      ? Math.max(...this.todos.map(({ id }) => id)) + 1
      : 1;
  }
}
