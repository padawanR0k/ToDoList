import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'app-todo-util',
  templateUrl: './todo-util.component.html',
  styleUrls: ['./todo-util.component.css']
})
export class TodoUtilComponent  {
  @Input() completedLength: number;
  @Input() activeLength: number;

  @Output() checkAll = new EventEmitter();
  @Output() clearAll = new EventEmitter();
}
