import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  // todo 입력폼의 값
  content = '';

  @Input() todos: Todo[];

  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    if (!this.content) { return; }
    const newTodo = { id: 4, content: this.content, completed: false };
    this.todos = [newTodo, ...this.todos];
    this.content = '';
  }
}
