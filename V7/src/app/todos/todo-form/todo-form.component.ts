import { Component} from '@angular/core';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  // todo 입력폼의 값
  content = '';

  constructor(public todoService: TodoService) { }

  onEnter() {
    if (!this.content) { return; }
    this.todoService.addTodo(this.content);
    this.content = '';
  }
}
