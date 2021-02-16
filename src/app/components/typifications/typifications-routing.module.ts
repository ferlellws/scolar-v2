import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypificationsComponent } from './typifications.component';

const routes: Routes = [{ path: '', component: TypificationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypificationsRoutingModule { }
