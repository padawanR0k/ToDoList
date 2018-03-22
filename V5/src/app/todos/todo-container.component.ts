import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  todos: Todo[];
  selectedNavItem = 'All';
  // 선택된 navigation item

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }
    ];
  }

  addTodo(content) {
    this.todos = [
      { id: this.lastTodoId(), content, completed: false },
      ...this.todos
    ];
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  removeCompletedTodos() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }

  toggleComplete(id: number) {
    // this.todos.forEach(todo => {
    //   todo = todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
    // });
    this.todos = this.todos.map(todo => {
      return todo.id === id
        ? Object.assign(todo, { completed: !todo.completed })
        : todo;
    });
  }

  toggleAllTodoAsComplete(completed: boolean) {
    // this.todos.forEach(todo => todo = Object.assign({}, todo, { completed }));
    this.todos = this.todos.map(todo => Object.assign(todo, { completed }));
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
