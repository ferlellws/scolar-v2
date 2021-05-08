import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProjectDetailsResolver } from './guards/project-details.resolver';
import { ValoremFormComponent } from './valorem-form/valorem.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeekFormComponent } from './week-form/week-form.component';
import { DesviationCausesFormComponent } from './desviation-causes-form/desviation-causes-form.component';
import { InterrelationsFormComponent } from './interrelations-form/interrelations-form.component';
import { PhaseManagementComponent } from './phase-management/phase-management.component';
import { DateRangeComponent } from './phase-management/date-range/date-range.component';

const materialModels = [
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
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
  MatTableModule,
  MatNativeDateModule,
  MatListModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatIconModule,
  CdkStepperModule,
  MatStepperModule,
  MatChipsModule,
  MatInputModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatMenuModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ValoremFormComponent,
    WeekFormComponent,
    DesviationCausesFormComponent,
    InterrelationsFormComponent,
    PhaseManagementComponent,
    DateRangeComponent  
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    SharedModule,
    FormsModule,
    materialModels,
    ReactiveFormsModule
  ],
  providers: [
    ProjectDetailsResolver,
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [
    materialModels
  ]
})
export class ProjectDetailsModule { }
