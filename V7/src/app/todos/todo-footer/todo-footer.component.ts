import { Component, OnInit, Input} from '@angular/core';
import { Todo } from '../../todo.interface';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  ngOnInit() {}
}
