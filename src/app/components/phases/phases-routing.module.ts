import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhasesComponent } from './phases.component';

const routes: Routes = [{ path: '', component: PhasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhasesRoutingModule { }
