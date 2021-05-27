import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectProgressReportRoutingModule } from './project-progress-report-routing.module';
import { ProjectProgressReportComponent } from './project-progress-report.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ProjectProgressReportComponent
  ],
  imports: [
    CommonModule,
    ProjectProgressReportRoutingModule,
    SharedModule,
    MatPaginatorModule,
  ]
})
export class ProjectProgressReportModule { }
