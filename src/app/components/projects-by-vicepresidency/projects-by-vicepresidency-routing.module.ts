import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsByVicepresidencyComponent } from './projects-by-vicepresidency.component';

const routes: Routes = [{ path: '', component: ProjectsByVicepresidencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsByVicepresidencyRoutingModule { }
