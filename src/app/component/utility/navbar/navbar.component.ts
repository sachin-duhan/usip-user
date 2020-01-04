import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public admin: Boolean = false;
  public intern: boolean = false;
  constructor(private _auth: LoginService) {
    if (this._auth.loggedIn()) {
      if (jwt_decode(this._auth.getToken()).admin) this.admin = true;
      else this.intern = true;
    }
  }
  ngOnInit() { }
  logout(): void {
    localStorage.removeItem('token');
    this.admin = false;
    this.intern = false;
  }
  show:boolean = false;
  addClass():void{
    this.show = !this.show;
  }
}
