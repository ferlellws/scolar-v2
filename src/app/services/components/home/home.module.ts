import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { HomeComponent } from './home.component';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';
import { ChartComponent } from './chart/chart.component';

// MATERIAL
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

// MODULES
import { NgxChartsModule }from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RESOLVERS
import { ProjectsIndicatorsResolver } from './../../guards/projects-indicators.resolver';
import { HomeIndicatorsChartComponent } from './home-indicators-chart/home-indicators-chart.component';

const materialModules = [
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatChipsModule
]

@NgModule({
  declarations: [HomeComponent, IndicatorCardComponent, ChartComponent, HomeIndicatorsChartComponent],
  imports: [
    CommonModule,
    materialModules,
    NgxChartsModule,
    //BrowserAnimationsModule,
  ],
  exports: [
    materialModules,
    NgxChartsModule,
    //BrowserAnimationsModule,
  ],
  providers: [
    ProjectsIndicatorsResolver
  ]
})
export class HomeModule { }
