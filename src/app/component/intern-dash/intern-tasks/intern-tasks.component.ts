import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {TasksService} from '../../../service/tasks.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intern-tasks',
  templateUrl: './intern-tasks.component.html',
  styleUrls: ['./intern-tasks.component.css']
})
export class InternTasksComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private task:TasksService,
              private _toast:ToastrService) { }
  public addTask:boolean = false;

  allowTask(): void {
    this.addTask = !this.addTask;
  }
  
  public tasks = [];
  ngOnInit() { 
    const credentials = jwt_decode(localStorage.getItem('token'));
    this.task.get_intern_task(credentials.id).subscribe(res=>{
      this.task = res.tasks;
    },err=>{
      console.log(err);
    });
  }

  addForm = this.fb.group({
    title:[''],
    date:Date.now()
  });

  submitForm():void{
    const credentials = jwt_decode(localStorage.getItem('token'));
    const task = {...this.addForm.value,pInfo:credentials.id};
    this.task.add_new_task(task).subscribe(res=>{
      this._toast.success(res.message,'Done');
      console.log(res);
    },err=>{
      console.log(err);
    })    
  }
}