import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesviationCausesComponent } from './desviation-causes.component';

const routes: Routes = [{ path: '', component: DesviationCausesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesviationCausesRoutingModule { }
