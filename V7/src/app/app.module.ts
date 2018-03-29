import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// 라우팅
import { AppRoutingModule } from './app-routing.module';

// 모듈
import { CoreModule } from './core/core.module';
import { TodosModule } from './todos/todos.module';
import { SigninModule } from './signin/signin.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TodosModule,
    CoreModule,
    SigninModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
