import { Component, ViewChild } from '@angular/core';
import { MessagesComponent } from './messages-component';
import { NewMessageComponent } from './new-message.component';
import { NavComponent } from './nav-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MessagesComponent) mc: MessagesComponent;

  onPosted(message) {
    this.mc.messages.push(message);
  }
}
