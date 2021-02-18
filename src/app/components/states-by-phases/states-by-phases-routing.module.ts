import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatesByPhasesComponent } from './states-by-phases.component';

const routes: Routes = [{ path: '', component: StatesByPhasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesByPhasesRoutingModule { }
