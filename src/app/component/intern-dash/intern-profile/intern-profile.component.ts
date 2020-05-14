import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
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

  ngOnInit() {
    const user = jwt_decode(localStorage.getItem('token'));
    this._intern.get_specific_intern_by_id(user.id).subscribe(res => {
      this.intern = res.intern.pInfo;
      this.officer = res.intern.repOfficer;
      this.bank = {
        bankName: res.intern.bankName,
        bankAc: res.intern.bankAc,
        ifsc: res.intern.ifsc
      };
      this.period = {
        start: res.intern.start,
        end: res.intern.end
      };
    }, err => {
      console.log(err);
      setTimeout(() => {
        this._toast.error('You are not autherized!', 'Contact Admin');
        localStorage.removeItem('token');
        this._router.navigate(['/']);
      }, 100);
    });
  }

  openPassword(): void {
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.height = '80%';
    config.width = '40%';
    if (window.innerWidth < 800) config.width = '80%';
    config.autoFocus = true;
    this.dialog.open(InternPasswordUpdateComponent, config);
  }

}
