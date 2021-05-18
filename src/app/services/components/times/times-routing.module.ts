import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesComponent } from './times.component';

const routes: Routes = [{ 
  path: '',
  component: TimesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesRoutingModule { }