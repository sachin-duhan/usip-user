import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { InternService } from '../../../service/intern.service'
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

    constructor (
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
        private _registerService: RegisterService,
        private router: Router,
        private _toast: ToastrService,
        private _auth: LoginService,
        private _intern: InternService
    ) { }

    public internDetails;
    public loading : boolean = false;
    public name: string = "Loading...";
    public open: boolean = false;
    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

    ngOnInit() {
        this.loading = true;
        this._registerService.applicationStatus('bank').subscribe(res => this.open = res.status);
        this._intern.get_complete_intern_data(this._auth.get_intern_id()).subscribe(
            res => {
                this._intern.cache_intern_data(res.body);
                this.internDetails = res.body.intern;
                this.name = this.internDetails.pInfo.name;
                this.loading =  false;
            }, err => setTimeout(() => {
                this.loading = false;
                this._toast.error('You are not unautherised!', 'Contact Admin');
                this.router.navigateByUrl('/');
            }, 100)
        );
    }

    openFormDialog() {
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
                    this._intern.update_intern_bank_details(this.internDetails._id, result).subscribe(
                        res => this._toast.success(res.message),
                        err => this._toast.error(err.error.message, 'Faliure')
                    );
                }
            });
        } else this._toast.warning('Bank details update are not allowed by ADMIN', 'OOPS...');
    }

    logout() { this._auth.logout(); }
}
