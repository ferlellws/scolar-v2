import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskLevelsRoutingModule } from './risk-levels-routing.module';
import { RiskLevelsComponent } from './risk-levels.component';


@NgModule({
  declarations: [RiskLevelsComponent],
  imports: [
    CommonModule,
    RiskLevelsRoutingModule
  ]
})
export class RiskLevelsModule { }
