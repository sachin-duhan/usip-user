import { Component } from '@angular/core';
import { InternProfileComponent } from '../intern-profile/intern-profile.component';
import { InternReportComponent } from '../intern-report/intern-report.component';
import { MatDialog } from '@angular/material';

import { InternService } from '../../../service/intern.service'
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-intern-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class InternDashComponent {

    public internNoti: Array<any> = [];

    public internDetails: any;
    public officerDetails: any;
    isShowingOfficerDetails: Boolean = false;

    constructor(
        public dialog: MatDialog,
        private _intern: InternService,
        private _login: LoginService,
    ) { }

    ngOnInit() {
        this._intern.intern_value_from_service.subscribe(res => {
            if (!res)
                this.get_data();
            else this.value_setter(res);
        });
    }

    get_data() {
        this._intern.get_complete_intern_data(this._login.get_intern_id()).subscribe(
            res => {
                this.value_setter(res.body);
                this._intern.cache_intern_data(res.body);
            }, err => this._login.logout()
        );
    }

    value_setter(data) {
        this.internDetails = data.intern;
        this.officerDetails = data.intern.repOfficer;
    }

    openProfile() { this.dialog.open(InternProfileComponent) }
    openAddReport() { this.dialog.open(InternReportComponent) }
}