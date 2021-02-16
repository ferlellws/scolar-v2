import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VicePresidenciesComponent } from './vice-presidencies.component';

const routes: Routes = [
  { path: '', component: VicePresidenciesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VicePresidenciesRoutingModule { }
