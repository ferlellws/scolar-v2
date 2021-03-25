import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsCreateRoutingModule } from './projects-create-routing.module';
import { ProjectsCreateComponent } from './projects-create.component';
import { ProjectsModule } from '../projects/projects.module';


@NgModule({
  declarations: [ProjectsCreateComponent],
  imports: [
    CommonModule,
    ProjectsCreateRoutingModule,
    ProjectsModule
  ]
})
export class ProjectsCreateModule { }
