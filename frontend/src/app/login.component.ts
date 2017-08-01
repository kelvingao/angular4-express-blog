import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    template: `
        <md-card>
            <md-input-container>
                <input mdInput [(ngModel)]="loginData.firstName" placeholder="User">
            </md-input-container>
             <md-input-container>
                <input mdInput [(ngModel)]="loginData.password" type="password" placeholder="Password">
            </md-input-container>
            <button md-raised-button color="primary" (click)="login()" >Login</button>
        </md-card>
    `
})

export class LoginComponent {
    loginData = {
        firstName:'',
        password:''
    }

    constructor(private auth: AuthService) {}

    login() {
        this.auth.login(this.loginData);
    }
}