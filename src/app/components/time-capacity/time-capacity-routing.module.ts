import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeCapacityComponent } from './time-capacity.component';

const routes: Routes = [{ path: '', component: TimeCapacityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeCapacityRoutingModule { }
