import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComplexityResolver } from 'src/app/guards/project-complexity.resolver';
import { ProjectsSummaryGraphsResolver } from 'src/app/components/summary-report/guards-summary/projects-summary-graphs.resolver';
import { IndicatorsReportComponent } from './indicators-report.component';
import { GeneralDevelopersIndicatorsResolver } from './guards/general-developers-indicators.resolver';
import { GeneralIndicatorsHoursDevelopersResolver } from './guards/general-indicators-hours-developers.resolver';
import { GeneralReturnIndicatorsResolver } from './guards/general-return-indicators.resolver';
import { DevelopersResolver } from './guards/developers.resolver';


const routes: Routes = [{ 
  path: '',
  component: IndicatorsReportComponent,
  resolve: {
    generalDevelopersIndicators: GeneralDevelopersIndicatorsResolver,
    generalIndicatorsHoursDevelopers: GeneralIndicatorsHoursDevelopersResolver,
    generalIndicatorsReturns: GeneralReturnIndicatorsResolver,
    developers: DevelopersResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GeneralDevelopersIndicatorsResolver,
    GeneralIndicatorsHoursDevelopersResolver,
    GeneralReturnIndicatorsResolver,
    DevelopersResolver
  ]
})
export class IndicatorsReportRoutiongModule { }