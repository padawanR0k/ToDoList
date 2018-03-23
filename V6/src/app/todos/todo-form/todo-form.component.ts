import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  // todo 입력폼의 값
  content = '';

  @Input() todos: Todo[];
  @Output() addTodo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onEnter() {
    if (!this.content) { return; }

    this.addTodo.emit(this.content);
    this.content = '';
  }
}
