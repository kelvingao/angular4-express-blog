import { Component } from '@angular/core'

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of messages">
        <md-card class="card">
            <md-card-title>{{message.owner}}</md-card-title>
            <md-card-content>{{message.text}}</md-card-content>
        </md-card>
    </div>
    `
})

export class MessagesComponent {
    messages = [{text: 'some tex', owner: 'Tim'}, {text: 'other message', owner: 'Jane'}];
}