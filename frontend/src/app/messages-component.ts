import { Component } from '@angular/core'
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
        <md-card class="card">
            <md-card-title [routerLink]="['/messages', message.owner._id]" style="cursor: pointer">{{message.owner.username}}</md-card-title>
            <md-card-content>{{message.text}}</md-card-content>
        </md-card>
    </div>
    `
})

export class MessagesComponent {

    constructor(private webService: WebService, private route: ActivatedRoute) {}

    ngOnInit() {
        var ownerId = this.route.snapshot.params.ownerId;
        this.webService.getMessages(ownerId);
        //this.webService.getUser().subscribe();
    }

}