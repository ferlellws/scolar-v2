import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { ColumnChartsComponent } from './column-charts/column-charts.component';
import { TimelineChartsComponent } from './timeline-charts/timeline-charts.component';
import { VegaChartsComponent } from './vega-charts/vega-charts.component';

// MATERIAL
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

const Material = [
  MatTabsModule,
  MatCardModule
]

const googleChartsComponents = [
  LineChartComponent,
  ColumnChartsComponent,
  PieChartsComponent,
  TimelineChartsComponent,
  VegaChartsComponent
];

@NgModule({
  declarations: [
    googleChartsComponents
  ],
  imports: [
    CommonModule,
    Material
    // googleChartsComponents
  ],
  exports: [
    googleChartsComponents,
    Material
  ]
})
export class GoogleChartsModule { }
