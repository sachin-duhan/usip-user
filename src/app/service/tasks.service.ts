import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

const headers = require('../@constants/main').headers;

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor(private http: HttpClient) { }
    private _url = environment.apiBaseURL + '/tasks';

    get_all_task_for_admin(): Observable<any> {
        return this.http.get<any>(this._url, { headers });
    }

    get_intern_task(id): Observable<any> {
        return this.http.get(`${this._url}/${id}`, { headers });
    }

    update_task_status(id, body): Observable<any> {
        return this.http.put(this._url + '/update/' + id, body, { headers });
    }

    add_new_task(data): Observable<any> {
        return this.http.post(this._url + '/create', data, { headers });
    }

    delete_task(id): Observable<any> {
        return this.http.delete<any>(this._url + '/' + id, { headers });
    }
}
