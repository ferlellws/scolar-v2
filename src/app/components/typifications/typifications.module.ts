import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypificationsRoutingModule } from './typifications-routing.module';
import { TypificationsComponent } from './typifications.component';


@NgModule({
  declarations: [TypificationsComponent],
  imports: [
    CommonModule,
    TypificationsRoutingModule
  ]
})
export class TypificationsModule { }
