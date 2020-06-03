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
    public reports: Array<any> = [];

    addForm = this.fb.group({
        start: [''],
        end: [''],
        summary: ['', Validators.minLength(60)]
    })

    ngOnInit() {
        this._report.get_all_intern_report(jwt_decode(localStorage.getItem('token')).id)
            .subscribe(res => this.reports = res.body);
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
            const id = jwt_decode(localStorage.getItem('token')).id;
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
                if (res.success)
                    this._toast.success(res.message, 'Done');
                else this._toast.warning(res.message, "OOPS");
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
        }, err => this._toast.error(err.message, 'OOPS...'));
    }
}
