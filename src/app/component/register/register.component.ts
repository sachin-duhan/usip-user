import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  domains: string[] = [];
  public noForm: Boolean = false;
  loading: Boolean = false;

  registerationForm = this.fb.group({
    name: ['', Validators.minLength(3)],
    branch: ['', Validators.minLength(2)],
    rollNo: ['', Validators.minLength(10)],
    marks: ['', Validators.max(10)],
    email: [''],
    phone: ['', Validators.minLength(10)],
    domain: [''],
    exp: ['']
  });

  ngOnInit() {
    this.loading = true;
    this._reg.applicationStatus('application').subscribe(res => {
      this.noForm = res.status;
      this.loading = false;
    }, err => {
      setTimeout(() => {
        this.loading = false;
        this.toast.error(err.message, 'Something went wrong!');
        this.router.navigate(['/']);
      }, 100);
    });
    this._reg.getDomain().subscribe(res => {
      this.domains = res.domain;
    }, err => {
      console.log(err);
      this.toast.error(err.message, 'BAD request');
    });
  }

  submitForm(): void {
    const rollNo = this.registerationForm.get('rollNo').value.toUpperCase();
    const phone = this.registerationForm.get('phone').value.toString();
    if (this.registerationForm.get('domain').value.length > 2) {
      this.toast.warning('Only 2 domains are allowed', 'Oops!!');
    } else if (rollNo.includes('DTU')) {
      this.toast.warning('DTU not required in Roll number', 'Oops!!');
    } else if (phone.length != 10) {
      this.toast.warning('Phone number not valid', 'Oops!!');
    } else {
      this._reg.postRegisteration(this.registerationForm.value).subscribe(body => {
        if (body.status === 'ok') {
          setTimeout(() => {
            this.registerationForm.reset();
            this.registerationForm.markAsUntouched();
            this.toast.success('Application submitted successfullly', 'Congratulation!')
            this.router.navigateByUrl('/');
          }, 250);
        } else if (body.name == 'MongoError') {
          this.toast.warning('Phone or Roll number is already registered', 'Check Info!');
        } else if (body.status == 'Already registered') {
          this.toast.error('Intern already Registered', 'Oops!!');
        } else {
          setTimeout(() => {
            this.toast.error('something went wrong', 'Oops!');
            this.router.navigateByUrl('/');
          }, 200);
        }
      },
        err => {
          console.log(err);
          this.toast.error('something went wrong!!', 'Sorry!');
        });
    }
  }

}