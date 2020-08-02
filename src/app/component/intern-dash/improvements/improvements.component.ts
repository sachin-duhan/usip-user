import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InternService } from '../../../service/intern.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-improvements',
    templateUrl: './improvements.component.html',
    styleUrls: ['./improvements.component.css']
})
export class ImprovementsComponent {

    constructor(
        private fb: FormBuilder,
        private _intern: InternService,
        public dialogRef: MatDialogRef<ImprovementsComponent>,
        private _toast: ToastrService,
        private _login: LoginService,
    ) { }

    suggestion = this.fb.group({
        title: [''],
        details: ['']
    });

    submitForm(): void {
        const id = this._login.get_intern_id();
        const data = { ...this.suggestion.value, pInfo: id }
        this._intern.add_improvement(data).subscribe(res => {
            this._toast.success(res.message, 'Added');
            setTimeout(() => this.dialogRef.close(), 1000);
        }, err => {
            this._toast.error(err.error.message, 'OOPS!');
            setTimeout(() => this.dialogRef.close(), 1000);
        });
    }
}
