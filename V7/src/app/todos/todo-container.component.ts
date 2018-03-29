import { Component} from '@angular/core';

import { TodoService } from '../core/services/todo-service';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {


  constructor(public todoService: TodoService) {}
  selectedNavItem = 'All';
  navItems = ['All', 'Active', 'Completed'];
  // 선택된 navigation item

  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
  }
}
