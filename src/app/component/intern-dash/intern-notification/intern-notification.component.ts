import { Component, OnInit } from '@angular/core';

import { NotifyService } from '../../../service/notify.service'
import { ToastrService } from 'ngx-toastr';
import { InternService } from 'src/app/service/intern.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-intern-notification',
    templateUrl: './intern-notification.component.html',
    styleUrls: ['./intern-notification.component.css']
})

export class InternNotificationComponent implements OnInit {

    public service_subscription: Subscription;
    constructor(
        private _intern: InternService,
        private _router: Router
    ) { }
    public pNotification: Array<any> = [];
    public internNotification: Array<any> = [];

    ngOnInit() {
        this.service_subscription = this._intern.intern_value_from_service.subscribe(data => {
            if (!data) this._router.navigateByUrl('/usip/intern');
            else {
                data.notifications.forEach(notification => {
                    if (notification.visiblity) this.pNotification.push(notification);
                    else this.internNotification.push(notification);
                });
            }
        })
    }

    ngOnDestroy() { this.service_subscription.unsubscribe(); }
}
