import { Component } from '@angular/core';
import { MessagesComponent } from './messages-component';
import { NavComponent } from './nav-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'world';
}
