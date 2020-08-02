import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';
const token_name = 'usip_intern_token';
const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient, private _router: Router) { }
    private _url = environment.apiBaseURL + '/user';

    postData(data): Observable<any> {
        return this.http.post<any>(this._url + '/login', data);
    }

    getData(): Observable<any> {
        return this.http.get<any>(this._url + '/signup', { headers });
    }

    editPassword(id, data): Observable<any> {
        return this.http.put<any>(this._url + '/password/' + id, data, { headers });
    }

    setToken(token: string) {
        localStorage.setItem(token_name, token);
    }

    getToken() {
        return localStorage.getItem(token_name);
    }

    loggedIn(): boolean {
        let credentials = null;
        if (localStorage.getItem(token_name))
            credentials = jwt_decode(this.getToken());
        return !!localStorage.getItem(token_name) && credentials.role === 'intern';
    }

    logout() {
        localStorage.removeItem(token_name);
        this._router.navigateByUrl('/');
    }
}
