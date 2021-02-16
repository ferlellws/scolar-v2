import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesByPhasesRoutingModule } from './states-by-phases-routing.module';
import { StatesByPhasesComponent } from './states-by-phases.component';


@NgModule({
  declarations: [StatesByPhasesComponent],
  imports: [
    CommonModule,
    StatesByPhasesRoutingModule
  ]
})
export class StatesByPhasesModule { }
