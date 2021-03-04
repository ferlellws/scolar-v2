import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { ColumnChartsComponent } from './column-charts/column-charts.component';
import { TimelineChartsComponent } from './timeline-charts/timeline-charts.component';

const googleChartsComponents = [
  LineChartComponent,
  ColumnChartsComponent,
  PieChartsComponent,
  TimelineChartsComponent
];

@NgModule({
  declarations: [
    googleChartsComponents
  ],
  imports: [
    CommonModule,
    // googleChartsComponents
  ],
  exports: [
    googleChartsComponents
  ]
})
export class GoogleChartsModule { }
