import { Component, OnInit } from '@angular/core';

import {NotifyService} from '../../../service/notify.service'
@Component({
  selector: 'app-intern-notification',
  templateUrl: './intern-notification.component.html',
  styleUrls: ['./intern-notification.component.css']
})
export class InternNotificationComponent implements OnInit {

  constructor(private _notify:NotifyService) { }

  public pNotification = [];
  public internNotification = [];

  ngOnInit() {
    this._notify.internNotification().subscribe(res => {
      this.internNotification = res.notifications;
    }, err => {
      console.log(err);
    });
    this._notify.publicNotification().subscribe(res => {
      this.pNotification = res.notifications;
    }, err => {
      console.log(err);
    });
  }

}
