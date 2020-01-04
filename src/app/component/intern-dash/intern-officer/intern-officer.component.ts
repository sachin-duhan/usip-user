import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-intern-officer',
  templateUrl: './intern-officer.component.html',
  styleUrls: ['./intern-officer.component.css']
})
export class InternOfficerComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
  public officer;
  ngOnInit() { 
    this.officer = this.data;
  }
}
