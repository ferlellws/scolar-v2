import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// COMPONENTS
import { ProjectsFormComponent } from '../projects-form/projects-form.component';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project';
import { ProjectsDeleteWarningComponent } from '../projects-delete-warning/projects-delete-warning.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tecno-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {

  user : User;
  firstname: string;
  lastname: string;

  @Input() id: string;
  @Input() bgColor: string;
  @Input() projectName: string;
  @Input() projectDescription: string;
  @Input() userReporter: string;
  @Input() company_id: string;
  @Input() code: string;
  @Input() is_active: string;
  @Input() is_multiple_components: string;
  @Input() is_multiple_resources: string;
  @Input() project_category_id: string;
  @Input() template_id: string;


  constructor(
    private _userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._userService.getUsers()
      .subscribe((data : User[]) =>
      {
        this.user = data.filter(user => user.id == parseInt(this.userReporter))[0]
        this.firstname =this.user.firstname;
        this.lastname =this.user.lastname;
      });

  }

  imprimir() {
    console.log('scope is ')
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      disableClose: true
    });
    let instance = dialogRef.componentInstance;
    instance.mode = 'modify';
    instance.id = this.id;
    instance.projectName = this.projectName;
    instance.projectDescription = this.projectDescription;
    instance.bgColor = this.bgColor;
    instance.userReporter = this.userReporter;
    instance.company_id = this.company_id;
    instance.code = this.code;
    instance.is_active = this.is_active;
    instance.is_multiple_components = this.is_multiple_components;
    instance.is_multiple_resources = this.is_multiple_resources;
    instance.project_category_id = this.project_category_id;
    instance.template_id = this.template_id;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(ProjectsDeleteWarningComponent, {
      disableClose: true
    });
    let instance = dialogRef.componentInstance;
    instance.id = this.id;
    instance.projectName = this.projectName;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
