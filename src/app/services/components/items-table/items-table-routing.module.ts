import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsResolver } from 'src/app/guards/icons.resolver';
import { ItemsTableComponent } from './items-table.component';


const routes: Routes = [{ 
  path: '',
  component: ItemsTableComponent,
  resolve: {
    icons: IconsResolver,
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    IconsResolver
  ]
})
export class ItemsTableRoutingModule { }