import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from '../../service/notify.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  public publicNotification = [];
  public loading: Boolean = false;
  public date = new Date();

  activePageDataChunk = [];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private _notificationService: NotifyService) { }
  ngOnInit() {
    this._notificationService.publicNotification().subscribe(
      res => {
        this.publicNotification = res.notifications;
        this.loading != this.loading;
        this.activePageDataChunk = this.publicNotification.slice(0, this.pageSize);
      }, err => {
        console.log(err);
      }
    );
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.publicNotification.slice(firstCut, secondCut);
  }
}
