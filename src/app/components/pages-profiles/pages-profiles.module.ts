import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesProfilesRoutingModule } from './pages-profiles-routing.module';
import { PagesProfilesComponent } from './pages-profiles.component';


@NgModule({
  declarations: [PagesProfilesComponent],
  imports: [
    CommonModule,
    PagesProfilesRoutingModule
  ]
})
export class PagesProfilesModule { }
