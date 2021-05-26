import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES
import { ItemsComponent } from './items.component';


// RESOLVERS
import { ComponentsResolver } from 'src/app/guards/components.resolver';
import { DeveloperCompaniesResolver } from 'src/app/guards/developer-companies.resolver';
import { IconsResolver } from 'src/app/guards/icons.resolver';
import { ItemPrioritiesResolver } from 'src/app/guards/item-priorities.resolver';
import { ItemResolutionsResolver } from 'src/app/guards/item-resolutions.resolver';
import { ItemSeveritiesResolver } from 'src/app/guards/item-severities.resolver';
import { ItemStatusResolver } from 'src/app/guards/item-status.resolver';
import { ItemTypesResolver } from 'src/app/components/items/guards/item-types.resolver';
import { ProjectItemsResolver } from 'src/app/components/items/guards/project_items.resolver';
import { ProjectResolver } from 'src/app/guards/project.resolver';
import { SponsorsCompaniesResolver } from 'src/app/guards/sponsors-companies.resolver';
import { UsersResolver } from 'src/app/guards/users.resolver';
import { ItemsFormComponent } from './items-form/items-form.component';


const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    resolve: {
      sponsorsCompanies: SponsorsCompaniesResolver,
      components: ComponentsResolver,
      developersCompanies: DeveloperCompaniesResolver,
      icons: IconsResolver,
      itemTypes: ItemTypesResolver,
      project: ProjectResolver,
      project_items: ProjectItemsResolver,
      itemPriorities: ItemPrioritiesResolver,
      itemResolutions: ItemResolutionsResolver,
      itemSeverities: ItemSeveritiesResolver,
      itemStatus: ItemStatusResolver,
      users: UsersResolver
    }
  },
  {
    path: ':id',
    component: ItemsComponent,
    resolve: {
      sponsorsCompanies: SponsorsCompaniesResolver,
      components: ComponentsResolver,
      developersCompanies: DeveloperCompaniesResolver,
      icons: IconsResolver,
      itemTypes: ItemTypesResolver,
      project: ProjectResolver,
      project_items: ProjectItemsResolver,
      itemPriorities: ItemPrioritiesResolver,
      itemResolutions: ItemResolutionsResolver,
      itemSeverities: ItemSeveritiesResolver,
      itemStatus: ItemStatusResolver,
      users: UsersResolver
    }
  },
  {
    path: ':id/:mode',
    component: ItemsComponent,
    resolve: {
      sponsorsCompanies: SponsorsCompaniesResolver,
      components: ComponentsResolver,
      developersCompanies: DeveloperCompaniesResolver,
      icons: IconsResolver,
      itemTypes: ItemTypesResolver,
      project: ProjectResolver,
      project_items: ProjectItemsResolver,
      itemPriorities: ItemPrioritiesResolver,
      itemResolutions: ItemResolutionsResolver,
      itemSeverities: ItemSeveritiesResolver,
      itemStatus: ItemStatusResolver,
      users: UsersResolver
    }
  },
  {
    path: ':id/:mode/:developer_company_id',
    component: ItemsComponent,
    resolve: {
      sponsorsCompanies: SponsorsCompaniesResolver,
      components: ComponentsResolver,
      developersCompanies: DeveloperCompaniesResolver,
      icons: IconsResolver,
      itemTypes: ItemTypesResolver,
      project: ProjectResolver,
      project_items: ProjectItemsResolver,
      itemPriorities: ItemPrioritiesResolver,
      itemResolutions: ItemResolutionsResolver,
      itemSeverities: ItemSeveritiesResolver,
      itemStatus: ItemStatusResolver,
      users: UsersResolver
    }
  },
  {
    path: 'new',
    component: ItemsFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    IconsResolver
  ]
})
export class ItemsRoutingModule { }
