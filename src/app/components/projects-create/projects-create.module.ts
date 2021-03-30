import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsCreateRoutingModule } from './projects-create-routing.module';
import { ProjectsCreateComponent } from './projects-create.component';
import { ProjectsModule } from '../projects/projects.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProjectsCreateComponent],
  imports: [
    CommonModule,
    ProjectsCreateRoutingModule,
    ProjectsModule,
    SharedModule
  ]
})
export class ProjectsCreateModule { }
