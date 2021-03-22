import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesProfilesComponent } from './pages-profiles.component';

const routes: Routes = [{ path: '', component: PagesProfilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesProfilesRoutingModule { }
