import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:63145/api';

    private messages = [];

    messageSubject = new Subject();

    constructor(private http: Http, private sb: MdSnackBar) {
        this.getMessages(null);
    }

    getMessages(user) {
            user = (user) ? '/' + user: '';
            this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
                    this.messages = response.json();
                    this.messageSubject.next(this.messages);
            }, error => {
                this.handleError("Unable to get messages");
            });
    }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messages.push(response.json());       
        } catch (error) {
            this.handleError("Unable to post message");
        }
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', {duration: 2000});
    }

}