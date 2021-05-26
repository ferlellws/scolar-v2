import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SummaryReport } from 'src/app/models/summary-report';

// MODELS

@Component({
  selector: 'tecno-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  summaryReport: SummaryReport;
  totalItemsGraph: any;
  hoursGraph: any;
  projectComplexity: any;
  projectsSummaryGraphs: any;
  deliveryOpportunityIndicators: any;
  comparativeQualityIndicators: any;
  qualityGraph: any;
  evolutionPerformanceIndicators: any;
  opportunityByType: any;
  opportunityBehavior: any;

  step = 0;

  multi: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.totalItemsGraph = data.totalItemsGraph;
      this.hoursGraph = data.hoursGraph;
      this.summaryReport = data.summaryReport;
      this.projectsSummaryGraphs = data.projectsSummaryGraphs;
      this.deliveryOpportunityIndicators = data.deliveryOpportunityIndicators.delivery_oportunity;
      this.comparativeQualityIndicators = data.comparativeQualityIndicators.comparative_quality;
      this.qualityGraph = data.qualityGraph.qualityGraph;
      this.projectComplexity = data.projectComplexity;
      this.opportunityByType = data.opportunityByType.delivery_oportunity;
      this.opportunityBehavior = data.opportunityBehavior.delivery_oportunity;
      this.evolutionPerformanceIndicators = data.evolutionPerformanceIndicators.evolutionPerformanceIndicators;

      /*
      var gestion = this.evolutionPerformanceIndicators.graphic_evolution_performance_indicators.filter(gestion => gestion.name == "Gestion")[0];

      for (let index = 0; index < gestion.series.length; index++) {
        gestion.series[index].value = (gestion.series[index].value)*20 + 200;
      }
      */
    });

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
