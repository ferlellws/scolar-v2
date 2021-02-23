import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CompaniesFormComponent } from './companies-form/companies-form.component';

@Component({
  selector: 'tecno-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  openDialog(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(CompaniesFormComponent, {
      width: '80%',
      disableClose: true
    });
 
  }
}
