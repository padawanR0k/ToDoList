import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {
  @Input() selectedNavItem: string;
  @Input() navItems: string[];
  // 선택된 navigation item
  selectedNavItem: string;
  @Output() selectFilter = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
    this.selectedNavItem = this.navItems[0];
  }
  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
    this.selectFilter.emit(selectedNavItem);
  }
}
