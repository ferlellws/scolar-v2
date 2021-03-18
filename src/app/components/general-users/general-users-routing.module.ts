import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralUsersComponent } from './general-users.component';

const routes: Routes = [{ path: '', component: GeneralUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralUsersRoutingModule { }
