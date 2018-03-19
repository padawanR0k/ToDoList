import { Component } from '@angular/core';
import { Todo } from './todo.interface';
import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: TodoModel[];
  constructor() {
   this.todos = [
      new TodoModel( 1, '1번', false),
      new TodoModel( 2, '2번', false),
      new TodoModel( 3, '3번', true),
    ];
  }

  navPills = ['all', 'active', 'completed'];
  value = '';
  selecteditem = 'all';
  completedLength = 0;
  activeLength = 0;


  addTodo(content: string): void {
    this.todos = [new TodoModel(this.generateId(), content, false), ...this.todos];
    this.value = '';
  }
  generateId(): number {
    return Math.max(...this.todos.map(todo => todo.id)) + 1;
  }

  removeTodo(id): void {
    this.todos = this.todos.filter(todo => todo.id !== id);


  }

  checkId(id: number): void {
    this.todos = this.todos.map(todo => {
      return todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
    });
  }

  checkAll(checked: boolean) {
    this.todos = this.todos.map(todo => Object.assign({}, todo, {completed: checked}));

  }

  changeState(state: string) {
    this.selecteditem = state;
  }

  showCompltedLength() {
    return this.completedLength = this.todos.length - this.todos.filter( todo => todo.completed !== true).length;
  }
  showActiveLength() {
    return this.activeLength = this.todos.length - this.completedLength;
  }

  clearAllCompleted () {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}
