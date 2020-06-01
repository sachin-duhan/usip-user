import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as jwt_decode from 'jwt-decode';
import { InternPasswordUpdateComponent } from '../intern-password-update/intern-password-update.component';
import { InternService } from '../../../service/intern.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-intern-profile',
    templateUrl: './intern-profile.component.html',
    styleUrls: ['./intern-profile.component.css']
})
export class InternProfileComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private _intern: InternService,
        private _router: Router,
        private _toast: ToastrService
    ) { }

    public intern;
    public officer;
    panelOpenState = true;
    public bank;
    public period;

    tagline: String;
    loading: Boolean = false;
    ngOnInit() {
        this.loading = true;
        const user = jwt_decode(localStorage.getItem('token'));
        this._intern.get_specific_intern_by_id(user.id).subscribe(res => {
            this.intern = res.pInfo;
            this.officer = res.repOfficer;
            this.bank = {
                bankName: res.bankName,
                bankAc: res.bankAc,
                ifsc: res.ifsc
            };
            this.period = {
                start: res.start,
                end: res.end
            };
            this.loading = false;
        }, err => {
            setTimeout(() => {
                this._toast.error('You are not autherized!', 'Contact Admin');
                localStorage.removeItem('token');
                this._router.navigate(['/']);
            }, 100);
        });
    }

    openPassword() { this.dialog.open(InternPasswordUpdateComponent) }

}
