import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    show_navbar: boolean = false;
    constructor(private _auth: LoginService, private _router: Router) { }
    ngOnInit() {
        if (this._auth.loggedIn()) this._router.navigate(['/usip/intern']);
    }
}
