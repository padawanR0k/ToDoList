import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoFilterPipe } from './todo-filter.pipe';
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoFilterPipe,
    TodoContainerComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
