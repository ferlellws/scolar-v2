import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationResourcesComponent } from './operation-resources.component';

const routes: Routes = [{ path: '', component: OperationResourcesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationResourcesRoutingModule { }
