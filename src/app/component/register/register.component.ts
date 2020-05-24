import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private _reg: RegisterService,
        private toast: ToastrService,
    ) { }

    domains: string[] = [];
    public is_application_allowed: Boolean = false;
    loading: Boolean = false;

    registerationForm = this.fb.group({
        name: ['', Validators.minLength(3)],
        branch: ['', Validators.minLength(2)],
        rollNo: ['', Validators.minLength(10)],
        marks: ['', Validators.max(10)],
        email: [''],
        phone: ['', Validators.minLength(10)],
        domain: [''],
        exp: ['', Validators.minLength(50)]
    });

    ngOnInit() {
        this.loading = true;
        this._reg.applicationStatus('application').subscribe(res => {
            this.is_application_allowed = res.status;
            this.loading = false;
        });

        this._reg.getDomain().subscribe(res => this.domains = res.body);
    }

    submitForm(): void {
        const rollNo = this.registerationForm.get('rollNo').value.toUpperCase();
        const phone = this.registerationForm.get('phone').value.toString();
        if (this.registerationForm.get('domain').value.length > 2) {
            this.toast.warning('Only 2 domains are allowed', 'Oops!!');
        } else if (rollNo.includes('DTU')) {
            this.toast.warning('DTU not required in Roll number', 'Oops!!');
        } else if (phone.length < 10) {
            this.toast.warning('Phone number not valid', 'Oops!!');
        } else {
            this._reg.postRegisteration(this.registerationForm.value).subscribe(res => {
                if (res.success) {
                    this.toast.success("Applications submitted successfully", "congratulations");
                    this.registerationForm.reset();
                    this.registerationForm.clearValidators();
                } else
                    this.toast.warning(res.message, 'OOPS');
            }, err => this.toast.error(err.message, 'OOPS!'));
        }
    }
}