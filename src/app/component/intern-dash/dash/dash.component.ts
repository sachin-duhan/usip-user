import { Component } from '@angular/core';

import { InternProfileComponent } from '../intern-profile/intern-profile.component';
import { InternReportComponent } from '../intern-report/intern-report.component';
import { InternTasksComponent } from '../intern-tasks/intern-tasks.component';

import { MatDialog } from '@angular/material';
import { NotifyService } from '../../../service/notify.service';
import { ReportService } from '../../../service/report.service';

import * as jwt_decode from 'jwt-decode';
import { InternService } from '../../../service/intern.service'

@Component({
    selector: 'app-intern-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class InternDashComponent {

    public internNoti: Array<any> = [];
    public report: Array<any> = [];

    public isReport: Boolean = false;
    public isPrivateNoti: Boolean = false;

    public internDetails: any;
    public officerDetails: any;
    isShowingOfficerDetails: Boolean = false;

    constructor(
        public dialog: MatDialog,
        private _notfi: NotifyService,
        private _report: ReportService,
        private _intern: InternService,
    ) { }

    ngOnInit() {
        const credentials = jwt_decode(localStorage.getItem('token'));
        this.settingVariables();
        this._intern.get_specific_intern_by_id(credentials.id)
            .subscribe(res => {
                this.internDetails = res;
                this.officerDetails = this.internDetails.repOfficer;
            });
    }

    openProfile() {
        this.dialog.open(InternProfileComponent);
    }

    openAddReport() { this.dialog.open(InternReportComponent) }
    openTasks() { this.dialog.open(InternTasksComponent) }

    settingVariables() {
        this._notfi.internNotification().subscribe(res => {
            if (res.success && Array.isArray(res.body) && res.body.length > 0) this.isPrivateNoti = true;
            this.internNoti = res.body;
        });

        this._report.get_all_intern_report(jwt_decode(localStorage.getItem('token')).id)
            .subscribe(res => {
                if (res.success && Array.isArray(res.body) && res.body.length > 0) this.isReport = true;
                this.report = res.body;
            });
    }
}