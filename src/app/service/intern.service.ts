import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})

export class InternService {

    constructor(private http: HttpClient) { }

    private _urlGetIntern = environment.apiBaseURL + '/intern'; // URL = localhost:4000/intern
    private _urlRegister = this._urlGetIntern + '/register';

    private intern_data = new BehaviorSubject(null);
    public intern_value_from_service = this.intern_data.asObservable();
    cache_intern_data(value) { this.intern_data.next(value); }

    get_complete_intern_data(id:string): Observable<any> {
        return this.http.get(`${environment.apiBaseURL}/dashboard/intern/${id}`,{headers});
    }

    showRegisterIntern(): Observable<any> {
        return this.http.get<any>(this._urlRegister, { headers });
    }

    showIntern(): Observable<any> {
        return this.http.get<any>(this._urlGetIntern, { headers });
    }

    addIntern(data): Observable<any> {
        return this.http.post<any>(this._urlRegister, data, { headers });
    }

    putIntern(id, data): Observable<any> {
        return this.http.put<any>(this._urlRegister + '/' + id, data, { headers });
    }

    update_intern_bank_details(id, data): Observable<any> {
        return this.http.put<any>(this._urlRegister + '/' + id, data, { headers });
    }

    get_specific_intern_by_id(id): Observable<any> {
        const url = this._urlRegister + `/${id}`;
        return this.http.get<any>(url, { headers });
    }

    add_improvement(data): Observable<any> {
        const url = environment.apiBaseURL + '/bug';
        return this.http.post<any>(url, data, { headers });
    }

    get_improvement(): Observable<any> {
        const url = environment.apiBaseURL + '/bug';
        return this.http.get<any>(url, { headers });
    }

    delete_improvement(id): Observable<any> {
        const url = environment.apiBaseURL + '/bug/' + id;
        return this.http.delete<any>(url, { headers });
    }
}