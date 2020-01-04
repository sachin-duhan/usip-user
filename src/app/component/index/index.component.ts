import { Component, OnInit } from '@angular/core';

import { NotifyService } from '../../service/notify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private toast: ToastrService,private _notification:NotifyService) { }

  ngOnInit() {
    // Using this when we redirect from the register page!!
    if((window.localStorage.length > 0) && (window.localStorage.getItem('application') === 'ok')){
      this.toast.success('Application submitted successfully', 'congratulations!!');
      window.localStorage.removeItem('application');
    }
    if((window.localStorage.length > 0) && (window.localStorage.getItem('logout') === 'ok')){
      this.toast.success('You have logged Out', 'Success');
      window.localStorage.removeItem('logout');
    }
    if(window.localStorage.length > 0 && (window.localStorage.getItem('bug'))){
      var message = window.localStorage.getItem('bug');
      this.toast.error(message, 'Error!');
      window.localStorage.removeItem('bug');
    }
  }

}
