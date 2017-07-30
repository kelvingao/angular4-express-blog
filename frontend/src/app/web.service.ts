import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    constructor(private http: Http) {

    }

    async getMessages() {
        return this.http.get('http://localhost:63145/api/messages').toPromise();
    }
}