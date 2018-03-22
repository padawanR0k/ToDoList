import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from './models/todo.model';

@Pipe({
  name: 'filterTodos'
})
export class FilterPipe implements PipeTransform {

  transform(todos: TodoModel[], filter: string): TodoModel[] {
    return todos.filter(todo => {
      switch (filter) {
        case 'all':
          return todo;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;
      }
    });
  }

}
