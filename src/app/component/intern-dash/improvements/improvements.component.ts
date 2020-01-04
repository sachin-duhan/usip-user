import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {InternService} from '../../../service/intern.service';
import * as jwt_decode from 'jwt-decode';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-improvements',
  templateUrl: './improvements.component.html',
  styleUrls: ['./improvements.component.css']
})
export class ImprovementsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _intern:InternService,
    public dialogRef:MatDialogRef<ImprovementsComponent>,
    private _toast:ToastrService) { }
  suggestion = this.fb.group({
    title: [''],
    details: ['']
  });
  ngOnInit() {
  }

  submitForm(): void {
    const id = jwt_decode(localStorage.getItem('token')).id;
    const data = {
      ...this.suggestion.value,
      pInfo:id
    }
    this._intern.add_improvement(data).subscribe(res=>{
      this._toast.success(res.message,'Added');
      setTimeout(() => {
        this.dialogRef.close();        
      }, 1000);
    },err=>{
      this._toast.error(err.error.message,'Error');
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
      console.log(err);
    });
  }
}
