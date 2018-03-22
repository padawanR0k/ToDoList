import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  @Input() todos: TodoModel;
  @Input() value: string;

  @Output() enter = new EventEmitter<TodoModel>();
}
