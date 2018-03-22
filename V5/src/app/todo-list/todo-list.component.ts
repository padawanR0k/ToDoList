import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoModel } from '../models/todo.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: TodoModel[];
  @Input() filter: string;
  @Input() selecteditem: string;


  @Output() remove = new EventEmitter<TodoModel>();
  @Output() check = new EventEmitter<TodoModel>();
}
