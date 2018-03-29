import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { TodoContainerComponent } from './todos/todo-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
