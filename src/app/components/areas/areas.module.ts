import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// COMPONENTS
import { AreasComponent } from './areas.component';
import { AreasFormComponent } from './areas-form/areas-form.component';

// MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// MODULES
import { AreasRoutingModule } from './areas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreasResolver } from './guards-areas/areas.resolver';

const materialModels = [
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
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    AreasComponent,
    AreasFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AreasRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    AreasResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class AreasModule { }
