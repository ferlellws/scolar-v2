import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusesComponent } from './statuses.component';

const routes: Routes = [{ 
  path: '',
  component: StatusesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusesRoutingModule { }