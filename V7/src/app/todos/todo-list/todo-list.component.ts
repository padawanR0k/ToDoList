import { Component, Input } from '@angular/core';
import { Todo } from '../../todo.interface';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() selectedNavItem: string;

  constructor(public todoService: TodoService) {}

}
