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
  public name: String = "";
  public open: Boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  ngOnInit(): void {
    const credentials = jwt_decode(localStorage.getItem('token'));
    setInterval(() => {
      if (!this._auth.loggedIn() && (credentials.exp < Date.now())) { this.router.navigateByUrl('/'); }
    }, 1000);

    // getting the login 
    this._intern.get_specific_intern_by_id(credentials.id).subscribe(res => {
      // console.log(res);
      this.name = res.intern.pInfo.name;
      this.internDetails = res.intern;
    }, err => {
      console.log(err);
      setTimeout(() => {
        this._toast.error('You are not unautherised!', 'Contact Admin');
      }, 100);
      this.router.navigateByUrl('/');
    });

    // get the bank status!
    this._registerService.applicationStatus('bank').subscribe(res => {
      this.open = res.status;
    }, err => {
      console.log(err);
      this._toast.error('Report to Office', 'Something went wrong');
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
      config.height = '80%';
      config.data = bankDetails;
      if (window.innerWidth < 800) config.height = '95%';
      ref = this.dialog.open(BankDetailsFormComponent, config);

      ref.afterClosed().subscribe(result => {
        // console.log(result);
        if (result.bankAc != this.internDetails.bankName && this.internDetails.bankAc) {
          this._intern.update_intern_bank_details(this.internDetails._id, result).subscribe(res => {
            // console.log(res);
            this._toast.success(res.message);
          }, err => {
            console.log(err);
            this._toast.error(err.error.message, 'Faliure');
          });
        }
      });
    } else {
      this._toast.warning('Bank details not allowed by ADMIN', 'Not Allowed');
    }
  }

  logout(): void {
    window.localStorage.clear();
    window.localStorage.setItem('logout', 'ok');
    this.router.navigateByUrl('/');
  }
}
