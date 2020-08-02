import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})

export class NotifyService {

    constructor(private http: HttpClient) { }
    private _urlNotify = environment.apiBaseURL + '/notification';

    publicNotification(): Observable<any> {
        return this.http.get<any>(this._urlNotify + '/public', { headers });
    }
    
    internNotification(): Observable<any> {
        return this.http.get<any>(this._urlNotify + '/intern', { headers });
    }
}
