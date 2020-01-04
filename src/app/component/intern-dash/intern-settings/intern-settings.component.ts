import { Component, OnInit } from '@angular/core';
import { ImprovementsComponent } from '../improvements/improvements.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-intern-settings',
  templateUrl: './intern-settings.component.html',
  styleUrls: ['./intern-settings.component.css']
})
export class InternSettingsComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  open_bug(): void {
    const config = new MatDialogConfig();
    config.height = '75%';
    config.width = '45%';
    if(window.innerWidth < 800){
      config.height = '80%';
      config.width = '95%';
    }
    this.dialog.open(ImprovementsComponent,config);
  }
}
