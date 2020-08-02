import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../../service/report.service';
import { ToastrService } from 'ngx-toastr';
import { InternService } from 'src/app/service/intern.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-intern-report',
    templateUrl: './intern-report.component.html',
    styleUrls: ['./intern-report.component.css']
})
export class InternReportComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private _intern: InternService,
        private _report: ReportService,
        private router: Router,
        private _auth: LoginService,
        private _toast: ToastrService
    ) { }

    public addReport: boolean = false;
    loading: Boolean = false;
    public reports: Array<any> = [];

    addForm = this.fb.group({
        start: [''],
        end: [''],
        summary: ['', Validators.minLength(60)]
    })

    ngOnInit() {
        this._intern.intern_value_from_service.subscribe(res => {
            if (!res) this.router.navigateByUrl('/usip/intern');
            else this.reports = res.reports;
        });
    }

    fileData: File = null; //this contain the file details for the report!!
    input: string = "Choose a File";

    onFileSelected(event) {
        this.fileData = <File>event.target.files[0];
        this.input = this.fileData.name;
    }

    submitForm(): void {
        if (this.addForm.get('start').value > this.addForm.get('end').value) {
            this._toast.warning('Kindly check the start & end Date', 'Oops!');
        } else {
            const id = this._auth.get_intern_id();
            let formData = new FormData();
            this.loading = !this.loading;
            formData.append('image', this.fileData, this.fileData.name);
            formData.append('start', this.addForm.get('start').value);
            formData.append('end', this.addForm.get('end').value);
            formData.append('description', this.addForm.get('summary').value);
            this._report.add_report_using_intern_id(id, formData).subscribe(res => {
                this.addForm.reset();
                this.addReport = !this.addReport;
                this.loading = !this.loading;
                console.log(res);
                if (res.success) {
                    this.reports.unshift(res.body);
                    this.addForm.reset();
                    this.addForm.markAsUntouched();
                    this._toast.success(res.message, 'Done');
                } else this._toast.warning(res.message, "OOPS");
            }, err => {
                this.loading = !this.loading;
                console.log(err);
                this._toast.error(err.message, 'Error');
            });
        }
    }

    delete(id, index: number): void {
        this._report.deleteReport(id).subscribe(res => {
            this._toast.success(res.message, 'Done');
            this.reports.splice(index, 1);
        }, err => this._toast.error(err.message, 'OOPS!'));
    }
}
