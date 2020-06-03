import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../../service/tasks.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-intern-tasks',
    templateUrl: './intern-tasks.component.html',
    styleUrls: ['./intern-tasks.component.css']
})

export class InternTasksComponent implements OnInit {

    constructor(private fb: FormBuilder,
        private _task: TasksService,
        private _toast: ToastrService) { }

    public addTask: Boolean = false;

    public tasks: Array<any> = [];
    ngOnInit() {
        const credentials = jwt_decode(localStorage.getItem('token'));
        this._task.get_intern_task(credentials.id).subscribe(res => {
            this.tasks = res.body;
        });
    }

    addForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: Date.now()
    });

    submitForm(): void {
        const credentials = jwt_decode(localStorage.getItem('token'));
        const task = { ...this.addForm.value, pInfo: credentials.id };
        this._task.add_new_task(task).subscribe(res => {
            this._toast.success(res.message, 'Done');
            console.log(res);
        }, err => { this._toast.error(err.message, "Ooops"); console.log(err) })
    }
}
