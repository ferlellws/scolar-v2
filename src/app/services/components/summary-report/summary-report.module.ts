import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryReportRoutingModule } from './summary-report-routing.module';
import { SummaryReportComponent } from './summary-report.component';


// MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// MODULES
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DevelopComplexityComponent } from './develop-complexity/develop-complexity.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsByComponentComponent } from './items-by-component/items-by-component.component';
import { ChartLabelComponent } from './chart-label/chart-label.component';
import { HoursByComponentComponent } from './hours-by-component/hours-by-component.component';
import { HoursByProjectComponent } from './hours-by-project/hours-by-project.component';
import { SummaryProjectsComponent } from './summary-projects/summary-projects.component';
import { DeliveryOpportunitiessComponent } from './delivery-opportunitiess/delivery-opportunitiess.component';
import { ComparativeQualityComponent } from './comparative-quality/comparative-quality.component';
import { QualityGraphComponent } from './quality-graph/quality-graph.component';
import { EvolutionPerformanceIndicatorsComponent } from './evolution-performance-indicators/evolution-performance-indicators.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProjectComplexityComponent } from './project-complexity/project-complexity.component';
import { OpportunitiessByTypeComponent } from './opportunitiess-by-type/opportunitiess-by-type.component';
import { OpportunityBehaviorComponent } from './opportunity-behavior/opportunity-behavior.component';

// import { MatButtonToggleModule } from '@angular/material/button-toggle';

const materialModules = [
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatMenuModule,
  MatDividerModule,
  MatTabsModule,
  MatNativeDateModule,
  MatListModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatIconModule,
  CdkStepperModule,
  MatStepperModule,
  MatChipsModule,
  MatCardModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    SummaryReportComponent,
    SummaryProjectsComponent,
    DeliveryOpportunitiessComponent,
    DevelopComplexityComponent,
    ComparativeQualityComponent,
    ItemsByComponentComponent,
    ChartLabelComponent,
    HoursByComponentComponent,
    HoursByProjectComponent,
    QualityGraphComponent,
    EvolutionPerformanceIndicatorsComponent,
    ProjectComplexityComponent,
    OpportunitiessByTypeComponent,
    OpportunityBehaviorComponent,
  ],
  imports: [
    CommonModule,
    materialModules,
    NgxChartsModule,
    SharedModule,
    SummaryReportRoutingModule
  ],
  exports: [
    materialModules,
    NgxChartsModule,
  ],
})
export class SummaryReportModule { }
