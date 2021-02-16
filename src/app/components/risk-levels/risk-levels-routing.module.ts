import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskLevelsComponent } from './risk-levels.component';

const routes: Routes = [{ path: '', component: RiskLevelsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskLevelsRoutingModule { }
