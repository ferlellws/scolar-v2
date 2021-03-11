import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoGephiComponent } from './demo-gephi.component';

const routes: Routes = [{ path: '', component: DemoGephiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoGephiRoutingModule { }
