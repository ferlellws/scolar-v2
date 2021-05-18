import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsReportComponent } from './indicators-report.component';

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
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { GoogleChartsModule } from 'angular-google-charts';
import { GeneralIndicatorsComponent } from './general-indicators/general-indicators.component';
import { DevelopersIndicatorsComponent } from './developers-indicators/developers-indicators.component';
import { SharedModule } from '../shared/shared.module';

// RESOLVERS
import { GeneralIndicatorsHoursDevelopersResolver } from './guards/general-indicators-hours-developers.resolver';
import { GeneralDevelopersIndicatorsResolver } from './guards/general-developers-indicators.resolver';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GeneralReturnIndicatorsResolver } from './guards/general-return-indicators.resolver';
import { DevelopersResolver } from './guards/developers.resolver';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { IndicatorsReportRoutiongModule } from './indicators-report-routing.module';

// MODULES

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
  MatProgressSpinnerModule,
  MatProgressBarModule,
  DragDropModule
];

@NgModule({
  declarations: [
    IndicatorsReportComponent,
    GeneralIndicatorsComponent,
    DevelopersIndicatorsComponent,
    DeveloperDetailComponent,
  ],
  imports: [
    CommonModule,
    materialModules,
    SharedModule,
    IndicatorsReportRoutiongModule
  ],
  exports: [
    materialModules
  ]
})
export class IndicatorsReportModule { }
