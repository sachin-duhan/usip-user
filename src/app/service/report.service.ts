import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private _urlReport = environment.apiBaseURL + '/report';
    constructor(private http: HttpClient) { }

    getSpecificReport(data): Observable<any> {
        return this.http.get<any>(this._urlReport + '/' + data, { headers });
    }

    add_report_using_intern_id(id, data): Observable<any> {
        return this.http.post<any>(this._urlReport + '/' + id, data);
    }

    get_all_intern_report(data): Observable<any> {
        return this.http.get<any>(this._urlReport + '/intern/' + data, { headers });
    }

    deleteReport(data): Observable<any> {
        return this.http.delete<any>(this._urlReport + '/' + data, { headers });
    }
}
