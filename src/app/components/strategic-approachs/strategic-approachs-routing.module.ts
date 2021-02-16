import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrategicApproachsComponent } from './strategic-approachs.component';

const routes: Routes = [{ path: '', component: StrategicApproachsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategicApproachsRoutingModule { }
