import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComplexityResolver } from 'src/app/guards/project-complexity.resolver';
import { ProjectsSummaryGraphsResolver } from 'src/app/components/summary-report/guards-summary/projects-summary-graphs.resolver';
import { ComparativeQualityIndicatorsResolver } from './guards-summary/comparative-quality-indicators.resolver';
import { DeliveryOpportunityIndicatorsResolver } from './guards-summary/delivery-opportunity-indicators.resolver';
import { EvolutionPerformanceIndicatorsResolver } from './guards-summary/evolution-performance-indicators.resolver';
import { HoursGraphResolver } from './guards-summary/hours-graph.resolver';
import { OpportunityBehaviorResolver } from './guards-summary/opportunity-behavior.resolver';
import { OpportunitybyTypeResolver } from './guards-summary/opportunity-by-type.resolver';
import { QualityGraphResolver } from './guards-summary/quality-graph.resolver';
import { TotalItemsGraphResolver } from './guards-summary/total-items-graph.resolver';
import { SummaryReportComponent } from './summary-report.component';

const routes: Routes = [{ 
  path: '',
  component: SummaryReportComponent,
  resolve: {
    totalItemsGraph: TotalItemsGraphResolver,
    hoursGraph: HoursGraphResolver,
    projectsSummaryGraphs: ProjectsSummaryGraphsResolver,
    deliveryOpportunityIndicators: DeliveryOpportunityIndicatorsResolver,
    comparativeQualityIndicators: ComparativeQualityIndicatorsResolver,
    qualityGraph: QualityGraphResolver,
    evolutionPerformanceIndicators: EvolutionPerformanceIndicatorsResolver,
    projectComplexity: ProjectComplexityResolver,
    opportunityByType: OpportunitybyTypeResolver,
    opportunityBehavior: OpportunityBehaviorResolver    
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TotalItemsGraphResolver,
    HoursGraphResolver,
    ProjectsSummaryGraphsResolver,
    DeliveryOpportunityIndicatorsResolver,
    ComparativeQualityIndicatorsResolver,
    QualityGraphResolver,
    EvolutionPerformanceIndicatorsResolver,
    ProjectComplexityResolver,
    OpportunitybyTypeResolver,
    OpportunityBehaviorResolver,
    ProjectsSummaryGraphsResolver
  ]
})
export class SummaryReportRoutingModule { }