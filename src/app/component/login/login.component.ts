import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private _login: LoginService,
        private toast: ToastrService,
        private router: Router
    ) { }

    public loading: Boolean = false;
    public hide: Boolean = true;

    ngOnInit() {
        if (this._login.loggedIn()) this.router.navigate(['/usip/intern']);
    }

    loginForm = this.fb.group({
        userName: [''],
        password: ['']
    });

    submit(): void {
        this.loading = true;
        this._login.postData(this.loginForm.value).subscribe(
            res => {
                if (res.role === 'intern') {
                    this._login.setToken(res.token);
                    this.router.navigate(['usip/intern']);
                }
                else this.toast.error('Login credentials not valid', 'Forbidden');
                this.loading = false;
            },
            err => {
                this.loading = false;
                this.toast.error('Login credentials not valid', 'Forbidden');
            }
        );
    }
}
