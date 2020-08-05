import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../service/login.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-intern-password-update',
    templateUrl: './intern-password-update.component.html',
    styleUrls: ['./intern-password-update.component.css']
})
export class InternPasswordUpdateComponent {

    constructor(private fb: FormBuilder,
        private _toast: ToastrService,
        private _login: LoginService,
        public dialogRef: MatDialogRef<InternPasswordUpdateComponent>) { }

    updatePassword = this.fb.group({
        password: [''],
        newPassword: [''],
        confirmPassword: ['']
    });

    submitForm(): void {
        if (this.updatePassword.get('newPassword').value != this.updatePassword.get('confirmPassword').value) {
            this._toast.warning('New password and confirm password mismatch!');
            return;
        }
        const id = this._login.get_intern_id();
        this._login.editPassword(id, this.updatePassword.value).subscribe(res => {
            this._toast.success(res.message, 'success');
            setTimeout(() => this.dialogRef.close(), 100);
        }, err => {
            this._toast.error(err.message, 'Error');
        });
    }

}
