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
    pageSizeOptions: number[] = [1, 5, 10, 15];

    constructor(private _notificationService: NotifyService) { }
    ngOnInit() {
        this.loading = true;
        this._notificationService.publicNotification()
            .subscribe(res => {
                this.loading = false;
                this.publicNotification = res.body;
                this.activePageDataChunk = this.publicNotification.slice(0, this.pageSize);
            }, err => this.loading = false);
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
