import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './service/login.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
    constructor(private _authService: LoginService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.loggedIn()) {
            return true;
        } else {
            this._authService.logout();
            return false;
        }
    }
}

