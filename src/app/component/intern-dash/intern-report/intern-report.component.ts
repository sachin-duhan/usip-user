import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../../service/report.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-intern-report',
    templateUrl: './intern-report.component.html',
    styleUrls: ['./intern-report.component.css']
})
export class InternReportComponent implements OnInit {
    constructor(private fb: FormBuilder,
        private _report: ReportService,
        private _toast: ToastrService) { }
    public addReport: boolean = false;

    loading: Boolean = false;
    public reports = [];

    addForm = this.fb.group({
        start: [''],
        end: [''],
        summary: ['', Validators.minLength(60)]
    })

    ngOnInit() {
        this._report.get_all_intern_report(jwt_decode(localStorage.getItem('token')).id).subscribe(res => {
            console.log(res);
            this.reports = res.reports;
            this.addURL(this.reports);
        }, err => {
            this._toast.error(err.error.message, 'reports not loaded');
        })
    }
    fileData: File = null;//this contain the file details for the report!!
    input: string = "Choose a File";
    onFileSelected(event) {
        this.fileData = <File>event.target.files[0];
        this.input = this.fileData.name;
    }

    addURL(data: any): void {
        data.map(el => {
            el.url = environment.apiBaseURL + '/public/' + el.reportImage;
        })
    }

    submitForm(): void {
        if (this.addForm.get('start').value > this.addForm.get('end').value) {
            this._toast.warning('Kindly check the start & end Date', 'Oops!');
        } else {
            const id = jwt_decode(localStorage.getItem('token')).id;
            let formData = new FormData();
            this.loading = !this.loading;
            formData.append('reportImage', this.fileData, this.fileData.name);
            formData.append('start', this.addForm.get('start').value);
            formData.append('end', this.addForm.get('end').value);
            formData.append('description', this.addForm.get('summary').value);
            this._report.add_report_using_intern_id(id, formData).subscribe(res => {
                console.log(res);
                this.addForm.reset();
                this.addReport = !this.addReport;
                this.loading = !this.loading;
                this._toast.success(res.message, 'Done');
            }, err => {
                console.log(err);
                this.loading = !this.loading;
                this._toast.error('report not uploaded', 'Error');
            });
        }
    }

    delete(id): void {
        this._report.deleteReport(id).subscribe(res => {
            this._toast.success(res.message, 'Done');
            document.getElementById(id).style.setProperty('display', 'none');
        }, err => this._toast.error(err.message, 'Falied'));
    }
}
