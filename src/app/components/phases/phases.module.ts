import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhasesRoutingModule } from './phases-routing.module';
import { PhasesComponent } from './phases.component';


@NgModule({
  declarations: [PhasesComponent],
  imports: [
    CommonModule,
    PhasesRoutingModule
  ]
})
export class PhasesModule { }
