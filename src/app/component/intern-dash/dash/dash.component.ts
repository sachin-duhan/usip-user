import { Component } from '@angular/core';

import { InternProfileComponent } from '../intern-profile/intern-profile.component';
import { InternOfficerComponent } from '../intern-officer/intern-officer.component';
import { InternReportComponent } from '../intern-report/intern-report.component';
import { InternTasksComponent } from '../intern-tasks/intern-tasks.component';

import { MatDialog } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
import { NotifyService } from '../../../service/notify.service';
import { ReportService } from '../../../service/report.service';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { InternService } from '../../../service/intern.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intern-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class InternDashComponent {

  public internNoti = [];
  public publicNoti = [];
  public report = [];

  constructor(public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private _notfi: NotifyService,
    private _report: ReportService,
    private router: Router,
    private _intern: InternService,
    private _toast: ToastrService
  ) {
    this._notfi.internNotification().subscribe(res => {
      this.internNoti = res.notifications;
    }, err => {
      this._toast.warning('Intern notifiaction not fetched!','Error');
    });

    this._notfi.publicNotification().subscribe(res => {
      this.publicNoti = res.notifications;
    }, err => {
      // console.log(err);
      this._toast.warning('Public Notifications not fetched!','Error');
    });

    this._report.getSpecificReport(jwt_decode(localStorage.getItem('token')).id).subscribe(res => {
      this.report = res.reports;
      // console.log(res);
    }, err => {
      // console.log(err);
      this._toast.warning('Reports not fetched!','Error');
    });
  }

  public internDetails;
  public officerDetails;

  ngOnInit() {

    const credentials = jwt_decode(localStorage.getItem('token'));

    // getting the login 
    this._intern.get_specific_intern_by_id(credentials.id).subscribe(res => {
      this.internDetails = res.intern;
      console.log(this.internDetails);
    }, err => {
      this._toast.error('You are not unautherised!', 'Contact Admin');
      this.router.navigateByUrl('/');
    });
  }

  openProfile(): void {
    if (window.innerWidth < 800) {
      this.bottomSheet.open(InternProfileComponent);
    } else {
      this.dialog.open(InternProfileComponent, {
        width: '85%',
        height: '70%'
      });
    }
  }
  openAddReport(): void {
    this.dialog.open(InternReportComponent);

  }
  openOfficer(): void {
    let officer = this.internDetails.repOfficer;
    this.bottomSheet.open(InternOfficerComponent, {
      data: officer
    });
  }
  openTasks(): void {
    this.dialog.open(InternTasksComponent);
  }


}
