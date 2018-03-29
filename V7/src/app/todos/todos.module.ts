import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoFilterPipe } from '../todo-filter.pipe';
import { TodoContainerComponent } from '../todos/todo-container.component';
import { TodoFormComponent } from '../todos/todo-form/todo-form.component';
import { TodoNavComponent } from '../todos/todo-nav/todo-nav.component';
import { TodoListComponent } from '../todos/todo-list/todo-list.component';
import { TodoFooterComponent } from '../todos/todo-footer/todo-footer.component';

import { FormsModule } from '@angular/forms';
import { TodosRoutingModule } from './todos.routing.module';


@NgModule({
  imports: [CommonModule, FormsModule, TodosRoutingModule],
  declarations: [
    TodoFilterPipe,
    TodoContainerComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent
  ],
  exports: [
    TodoFilterPipe,
    TodoContainerComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent
  ]
})
export class TodosModule {}
