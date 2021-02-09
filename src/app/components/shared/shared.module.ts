import { ProfileCircleComponent } from './profile-circle/profile-circle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  ProfileCircleComponent
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class SharedModule { }
