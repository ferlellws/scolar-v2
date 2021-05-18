import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectProgressCreateRoutingModule } from './project-progress-create-routing.module';
import { ProjectProgressCreateComponent } from './project-progress-create.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertConfirmPassOverdueComponent } from './alert-dialog-pass-overdue/alert-dialog-pass-overdue.component';
import { AlertConfirmPassDeliveredComponent } from './alert-dialog-pass-delivered/alert-dialog-pass-delivered.component';
import { DeliveredEditComponent } from './delivered-edit/delivered-edit.component';
import { InProgressFormComponent } from './in-progress-form/in-progress-form.component';
import { OverdueFormComponent } from './overdue-form/overdue-form.component';
import { ValoremFormComponent } from './valorem-form/valorem-form.component';


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
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    ProjectProgressCreateComponent,
    AlertConfirmPassOverdueComponent,
    AlertConfirmPassDeliveredComponent,
    DeliveredEditComponent,
    InProgressFormComponent,
    OverdueFormComponent,
    ValoremFormComponent
  ],
  imports: [
    CommonModule,
    ProjectProgressCreateRoutingModule,
    materialModels,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [
    materialModels
  ]
})
export class ProjectProgressCreateModule { }
