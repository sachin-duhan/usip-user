import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(private http: HttpClient) { }

    private _url = environment.apiBaseURL + '/tasks';

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    get_all_task_for_admin(): Observable<any> {
        return this.http.get<any>(this._url, {
            headers: this.headers
        });
    }

    get_intern_task(id): Observable<any> {
        const url = this._url + `/${id}`;
        return this.http.get(url, {
            headers: this.headers
        });
    }

    update_task_status(id, body): Observable<any> {
        return this.http.put(this._url + '/update/' + id, body, {
            headers: this.headers
        });
    }

    add_new_task(data): Observable<any> {
        return this.http.post(this._url + '/create', data, {
            headers: this.headers
        });
    }

    delete_task(id): Observable<any> {
        const url = this._url + '/' + id;
        return this.http.delete<any>(url, {
            headers: this.headers
        });
    }

}
