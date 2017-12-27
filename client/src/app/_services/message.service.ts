import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {

  BASE_URL = 'http://localhost:3000/';

  constructor(private http: Http, private auth: AuthService) { }
  /*
* method to get the messages between two users
*/
  public getMessages(params, callback): any {
    return this.http.post( this.BASE_URL + 'getMessages', params, this.auth.tokenHeader)
    .subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }
}
