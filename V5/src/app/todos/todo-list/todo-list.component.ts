import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() selectedNavItem;
  @Output() removeTodo = new EventEmitter();
  @Output() toggleComplete = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  remove(id: number) {
    this.removeTodo.emit(id);
  }
  toggleCheck(id: number) {
    this.toggleComplete.emit(id);
  }
}
