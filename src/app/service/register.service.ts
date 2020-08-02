import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) { }
    private _urlRegsiter = environment.apiBaseURL + '/register';

    showRegisterations(): Observable<any> {
        return this.http.get<any>(this._urlRegsiter, { headers });
    }

    getSpecificIntern(data): Observable<any> {
        return this.http.get<any>(this._urlRegsiter + '/' + data, { headers });
    }

    postRegisteration(data): Observable<any> {
        return this.http.post(this._urlRegsiter, data, { headers });
    }

    applicationStatus(input): Observable<any> {
        return this.http.get<any>(environment.apiBaseURL + '/allow/' + input, { headers });
    }

    getDomain(): Observable<any> {
        return this.http.get<any>(environment.apiBaseURL + '/domain', { headers });
    }

}
