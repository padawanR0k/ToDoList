import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent{
  @Input() selecteditem: string;
  @Input() navPills;

  @Output() clickFilter =  new EventEmitter();
}
