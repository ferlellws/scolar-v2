import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectProgressReportComponent } from './project-progress-report.component';

const routes: Routes = [{ path: '', component: ProjectProgressReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProgressReportRoutingModule { }
