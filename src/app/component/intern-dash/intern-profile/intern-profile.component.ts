import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InternPasswordUpdateComponent } from '../intern-password-update/intern-password-update.component';
import { InternService } from '../../../service/intern.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intern-profile',
    templateUrl: './intern-profile.component.html',
    styleUrls: ['./intern-profile.component.css']
})
export class InternProfileComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private _intern: InternService,
        private router: Router,
    ) { }

    public intern;
    public officer;
    public panelOpenState = true;
    public bank;
    public period;

    ngOnInit() {
        this._intern.intern_value_from_service.subscribe(data => {
            if (!data) this.router.navigateByUrl('/usip/intern');
            else {
                this.intern = data.intern.pInfo;
                this.bank = data.intern;
                this.officer = data.intern.repOfficer;
                this.period = {start: data.intern.start, end: data.intern.end};
            }
        })
    }

    openPassword() { this.dialog.open(InternPasswordUpdateComponent) }
}
