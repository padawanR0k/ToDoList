import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoFilterPipe } from './todo-filter.pipe';
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoNavComponent } from './todos/todo-nav/todo-nav.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';
import { TooltipDirective } from './tooltip.directive';


@NgModule({
  declarations: [
    AppComponent,
    TodoFilterPipe,
    TodoContainerComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
