import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VicePresidenciesRoutingModule } from './vice-presidencies-routing.module';
import { VicePresidenciesComponent } from './vice-presidencies.component';


@NgModule({
  declarations: [VicePresidenciesComponent],
  imports: [
    CommonModule,
    VicePresidenciesRoutingModule
  ]
})
export class VicePresidenciesModule { }
