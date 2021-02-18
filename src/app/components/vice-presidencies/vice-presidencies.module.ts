import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule } from '@angular/material/dialog';

// COMPONENTS
import { VicePresidenciesComponent } from './vice-presidencies.component';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { VicePresidenciesRoutingModule } from './vice-presidencies-routing.module';
import { VicePresidenciesFormComponent } from './vice-presidencies-form/vice-presidencies-form.component';

const materialModels = [
  MatDialogModule
];
@NgModule({
  declarations: [
    VicePresidenciesComponent,
    VicePresidenciesFormComponent
  ],
  imports: [
    CommonModule,
    VicePresidenciesRoutingModule,
    SharedModule,
    materialModels
  ],
  exports: [
    materialModels
  ]
})
export class VicePresidenciesModule { }
