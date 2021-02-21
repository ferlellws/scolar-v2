import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from './projects-form/projects-form.component';

@Component({
  selector: 'tecno-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openDialog(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: '80%',
      disableClose: true
    });
  }

}
