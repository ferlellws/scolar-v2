import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorsReportComponent } from './indicators-report.component';

const routes: Routes = [{ path: '', component: IndicatorsReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorsReportRoutingModule { }
