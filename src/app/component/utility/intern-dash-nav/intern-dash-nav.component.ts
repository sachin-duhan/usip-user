import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { InternService } from '../../../service/intern.service'
import { map } from 'rxjs/operators';
import { MatDialog, MatBottomSheet, MatDialogConfig } from '@angular/material';
import { RegisterService } from '../../../service/register.service';
import * as jwt_decode from 'jwt-decode';
import { BankDetailsFormComponent } from '../../intern-dash/bank-details-form/bank-details-form.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';

@Component({
    selector: 'app-intern-dash-nav',
    templateUrl: './intern-dash-nav.component.html',
    styleUrls: ['./intern-dash-nav.component.css']
})
export class InternDashNavComponent implements OnInit {
    constructor(private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog, private bottomSheet: MatBottomSheet,
        private _registerService: RegisterService,
        private router: Router,
        private _toast: ToastrService,
        private _auth: LoginService,
        private _intern: InternService) { }

    // intern details 
    public internDetails;
    public name: string = "";
    public open: boolean = false;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

    ngOnInit(): void {
        const credentials = jwt_decode(localStorage.getItem('token'));
        setInterval(() => {
            if (!this._auth.loggedIn() && (credentials.exp < Date.now())) { this.router.navigateByUrl('/'); }
        }, 1000);

        this._intern.get_specific_intern_by_id(credentials.id).subscribe(res => {
            this.name = res.pInfo.name;
            this.internDetails = res;
        }, err => {
            setTimeout(() => {
                this._toast.error('You are not unautherised!', 'Contact Admin');
                this.router.navigateByUrl('/');
            }, 100);
        });

        // get the bank status!
        this._registerService.applicationStatus('bank').subscribe(res => {
            this.open = res.status;
        });
    }

    openFormDialog(): void {
        const bankDetails = {
            bankName: this.internDetails.bankName,
            bankAc: this.internDetails.bankAc,
            ifsc: this.internDetails.ifsc,
            phone: this.internDetails.pInfo.phone,
            email: this.internDetails.pInfo.email
        }
        if (this.open) {
            let ref;
            const config = new MatDialogConfig();
            config.data = bankDetails;
            ref = this.dialog.open(BankDetailsFormComponent, config);

            ref.afterClosed().subscribe(result => {
                if (result.bankAc != this.internDetails.bankName && this.internDetails.bankAc) {
                    this._intern.update_intern_bank_details(this.internDetails._id, result)
                        .subscribe(res => this._toast.success(res.message),
                            err => this._toast.error(err.error.message, 'Faliure'));
                }
            });
        } else {
            this._toast.warning('Bank details update are not allowed by ADMIN', 'OOPS...');
        }
    }

    logout(): void {
        window.localStorage.clear();
        window.localStorage.setItem('logout', 'ok');
        this.router.navigateByUrl('/');
    }
}
