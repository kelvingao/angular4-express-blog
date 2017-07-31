import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages-component';
import { NavComponent } from './nav-component';
import { HttpModule } from '@angular/http';
import { WebService } from './web.service';
import { NewMessageComponent } from './new-message.component';

import { MdButtonModule, MdSnackBarModule, MdInputModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';

var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'messages/:name',
    component: MessagesComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }];

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NavComponent,
    NewMessageComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdSnackBarModule,
    MdInputModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
