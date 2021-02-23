import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { TableData } from 'src/app/models/table-data';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'tecno-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() table!: TableData;

  constructor(
    public dialog: MatDialog,
    private _projectService: ProjectsService
    ) { 
  }
    
  ngOnInit(): void {
    this._projectService.getProjectsAll()
    .subscribe(data => {
      this.table = data;
      console.log("TABLA",data);
      
    })
  }  

  openDialog(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: '80%',
      disableClose: true
    });
  }

  onEdit() { 
    environment.consoleMessage("onEdit", ">>>>>>>>>>>>>>>>> onEdit: ");
  }

  onDelete(data: number) {

    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
  }

  onDeleteLogic(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
  }

  onStatusChange(data: any) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
  }

}
