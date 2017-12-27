import { Injectable } from '@angular/core';
import { Http, Headers, Response , RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:3000/';
    USERId_KEY = 'kelma_userId';
    USERNAME_KEY = 'kelma_username';
    TOKEN_KEY = 'kelma_token';

    constructor(private http: Http, private router: Router) { }

    get userId() {
        return localStorage.getItem(this.USERId_KEY);
    }
    get userName() {
        return localStorage.getItem(this.USERNAME_KEY);
    }

    get isAuthenticated() {
        const token = localStorage.getItem(this.TOKEN_KEY);
        return tokenNotExpired(this.TOKEN_KEY);
    }

    get tokenHeader() {
        const header = new Headers({'Authorization': localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({ headers: header});
    }
    userNameCheck(userName) {
        return this.http.post(this.BASE_URL + '/usernameCheck', userName, this.tokenHeader)
            .map( (res: Response) => res.json())
            .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
    }

    login(loginData) {
        this.http.post(this.BASE_URL + 'login', loginData).subscribe(res => {
            this.authenticate(res);
        });
    }

    register(user) {
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + 'register', user).subscribe(res => {
            this.authenticate(res);
        });
    }

    logout() {
        localStorage.removeItem(this.USERId_KEY);
        localStorage.removeItem(this.USERNAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    authenticate(res) {
        const authResponse = res.json();
        // tslint:disable-next-line:curly
        if (!authResponse.token)
            return;
        localStorage.setItem(this.TOKEN_KEY, authResponse.token);
        localStorage.setItem(this.USERId_KEY, authResponse.userId);
        localStorage.setItem(this.USERNAME_KEY, authResponse.userName);
        this.router.navigate(['/messages']);
    }

}
