import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
    })
    
    this._projectService.emitDelete.subscribe(data => {
      this._projectService.getProjectsAll()
      .subscribe(data => {
        this.table = data;
      })
    });

    this._projectService.emitModify.subscribe(dtaa => {
      this._projectService.getProjectsAll()
      .subscribe(data => {
        this.table = data;
      })
    })
  }

  openDialog(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: '80%',
      disableClose: true
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data = 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onEdit(data: number) { 
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
  }

  onDelete(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
    this._projectService.deleteProjectsId(data);
  }

  onDeleteLogic(data: number) {
    var projectMod: any = {};
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
    projectMod.is_delete = 1;
    this._projectService.updateProjectsId(projectMod,data);
  }

  onStatusChange(data: any) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
    var projectMod: any = {};
    projectMod.is_active = data.value;
    this._projectService.updateProjectsId(projectMod, data.id);
  }

}
