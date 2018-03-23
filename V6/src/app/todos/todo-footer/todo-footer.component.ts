import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() CntCompleted: number;
  @Input() CntActive: number;
  @Output() AllToggle = new EventEmitter();
  @Output() removeCompletedTodos = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  AllCompleted(completed) {
    this.AllToggle.emit(completed);
  }
  removeCompleted() {
    this.removeCompletedTodos.emit();
  }

}