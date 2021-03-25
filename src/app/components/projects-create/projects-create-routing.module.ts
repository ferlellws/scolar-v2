import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsCreateComponent } from './projects-create.component';

const routes: Routes = [{ path: '', component: ProjectsCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsCreateRoutingModule { }
