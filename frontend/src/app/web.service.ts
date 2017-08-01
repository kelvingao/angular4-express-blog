import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:63145/api';

    private messageStore = [];

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    constructor(private http: Http, private sb: MdSnackBar, private auth: AuthService) {
        this.getMessages(null);
    }

    getMessages(user) {
            user = (user) ? '/' + user: '';
            this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
                    this.messageStore = response.json();
                    this.messageSubject.next(this.messageStore);
            }, error => {
                this.handleError("Unable to get messages");
            });
    }
    
    getUser() {
        return this.http.get(this.BASE_URL + '/user/me', this.auth.tokenHeader).map(res => res.json());
    }

    saveUser(userData) {
        return this.http.post(this.BASE_URL + '/user/me', userData, this.auth.tokenHeader).map(res => res.json());
    }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messageStore.push(response.json()); 
            this.messageSubject.next(this.messageStore);      
        } catch (error) {
            this.handleError("Unable to post message");
        }
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', {duration: 2000});
    }

}