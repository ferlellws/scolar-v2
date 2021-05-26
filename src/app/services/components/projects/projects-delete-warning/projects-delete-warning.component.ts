import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ItemsFormComponent } from '../../items/items-form/items-form.component';

@Component({
  selector: 'tecno-projects-delete-warning',
  templateUrl: './projects-delete-warning.component.html',
  styleUrls: ['./projects-delete-warning.component.scss']
})
export class ProjectsDeleteWarningComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProjectsDeleteWarningComponent>,
    private _projectsService: ProjectsService) { }
  
  @Input() id: string;
  @Input() projectName: string;

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject() {
    this._projectsService.deleteProject(this.id);
    this.dialogRef.close();
  }

}
