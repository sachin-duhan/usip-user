import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from '../../../service/login.service';
import * as jwt_decode from 'jwt-decode';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-intern-password-update',
  templateUrl: './intern-password-update.component.html',
  styleUrls: ['./intern-password-update.component.css']
})
export class InternPasswordUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _toast:ToastrService,
    private _login: LoginService,
    public dialogRef: MatDialogRef<InternPasswordUpdateComponent>){ }

  updatePassword = this.fb.group({
    password: [''],
    newPassword: [''],
    confirmPassword: ['']
  });

  submitForm(): void{
    if (this.updatePassword.get('newPassword').value != this.updatePassword.get('confirmPassword').value){
      this._toast.warning('Password mismatch!','error');
    }else{
      console.log(this.updatePassword.value);
      const id = jwt_decode(localStorage.getItem('token')).id;
      this._login.editPassword(id,this.updatePassword.value).subscribe(res=>{
        console.log(res);
        this._toast.success(res.message,'success');
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
      },err=>{
        console.log(err);
        this._toast.error(err.error,'Not allowed');
      });
    }
  }

  ngOnInit() {
  }

}
