import { Component, OnInit } from '@angular/core';

import { NotifyService } from '../../../service/notify.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-intern-notification',
  templateUrl: './intern-notification.component.html',
  styleUrls: ['./intern-notification.component.css']
})
export class InternNotificationComponent implements OnInit {

  constructor(
    private _notify: NotifyService,
    private _toast: ToastrService
  ) { }

  public pNotification = [];
  public internNotification = [];

  public isPublicNoti: Boolean = false;
  public isPrivateNoti: Boolean = false;

  ngOnInit() {
    this._notify.internNotification().subscribe(res => {
      if (!res.notifications || res.notifications.length > 0) this.isPrivateNoti = true;
      this.internNotification = res.notifications;
    }, err => {
      console.log(err);
      this._toast.warning('Reports not fetched!', 'Error');
    });

    this._notify.publicNotification().subscribe(res => {
      if (!res.notifications || res.notifications.length > 0) this.isPublicNoti = true;
      this.pNotification = res.notifications;
    }, err => {
      console.log(err);
      this._toast.warning('Reports not fetched!', 'Error');
    });
  }

}
