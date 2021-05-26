import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// COMPONENTS
import { ProjectsFormComponent } from './projects-form/projects-form.component';

// SERVICES
import { ProjectsService } from 'src/app/services/projects/projects.service';

import { Project } from 'src/app/models/project';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'tecno-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  animal: string;
  name: string;

  constructor(
    private _projectsService: ProjectsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._projectsService.getProjects()
      .subscribe(projects => this.projects = projects);
    this._projectsService.emitProjects.subscribe(
      projects =>
      {
        this.projects = projects;
        this.openSnackBar("Proyecto Eliminado", "Aceptar");
      }
    );
    this._projectsService.emitProject.subscribe(
      project => {
        var foundIndex = -1;
        for (let index = 0; index < this.projects.length; index++) {
          if (project.id == this.projects[index].id) {
            foundIndex= index;
            break;
          }
        }
        if (foundIndex == -1) {
          this.projects.push(project);
          this.openSnackBar("Proyecto Creado", "Aceptar");
        } else {
          this.projects.splice(foundIndex, 1, project);
          this.openSnackBar("Proyecto Modificado", "Aceptar");
        }
      }
    );


  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      data: {name: this.name, animal: this.animal},
      disableClose: true
    });
    let instance = dialogRef.componentInstance;
    instance.mode = 'create';

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: "succes-snack-bar"
    });
  }

}
