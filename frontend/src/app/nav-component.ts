import { Component } from '@angular/core'

@Component({
    selector: 'nav',
    template: `
        <md-toolbar color="primary">
            <button md-button routerLink="/">Message Board</button>
            <button md-button routerLink="/messages">Messages</button>
        </md-toolbar>
    `
})

export class NavComponent {
}