import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:63145/api';

    messages = [];

    constructor(private http: Http) {
        this.getMessages();
    }

    async getMessages() {
        var response = await this.http.get(this.BASE_URL + '/messages').toPromise();
        this.messages = response.json();
    }

    async postMessage(message) {
        var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
        this.messages.push(response.json());
    }

}