import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsResolver } from './guards-projects/projects.resolver';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [{ 
  path: '', component: ProjectsComponent,
  resolve: {
    project: ProjectsResolver
  } 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProjectsResolver
  ]
})
export class ProjectsRoutingModule { }
