import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectProgressCreateComponent } from './project-progress-create.component';

const routes: Routes = [{ path: '', component: ProjectProgressCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProgressCreateRoutingModule { }
