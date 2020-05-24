import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../service/notify.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
    public publicNotification: Array<any> = [];
    public loading: Boolean = false;
    public date = new Date();

    activePageDataChunk: Array<any> = [];
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 15];

    constructor(private _notificationService: NotifyService) { }
    ngOnInit() {
        this._notificationService.publicNotification().subscribe(
            res => {
                console.log(res);
                this.publicNotification = res.body;
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
