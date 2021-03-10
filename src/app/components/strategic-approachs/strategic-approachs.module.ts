import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { StrategicApproachsComponent } from './strategic-approachs.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';


// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StrategicApproachsRoutingModule } from './strategic-approachs-routing.module';
import { StrategicApproachesFormComponent } from './strategic-approaches-form/strategic-approaches-form.component';
import { StrategicApproachesResolver } from './guards-strategic-approaches/strategic-approaches.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    StrategicApproachsComponent,
    StrategicApproachesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StrategicApproachsRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    StrategicApproachesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StrategicApproachsModule { }
