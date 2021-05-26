import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// RESOLVERS
import { DeveloperCompaniesResolver } from 'src/app/guards/developer-companies.resolver';
import { ItemPrioritiesResolver } from 'src/app/guards/item-priorities.resolver';
import { ProjectResolver } from '../../guards/project.resolver';
import { SponsorsCompaniesResolver } from 'src/app/guards/sponsors-companies.resolver';
import { ItemStatusResolver } from './../../guards/item-status.resolver';
import { UsersResolver } from './../../guards/users.resolver';
import { ItemResolutionsResolver } from './../../guards/item-resolutions.resolver';
import { ItemSeveritiesResolver } from './../../guards/item-severities.resolver';
import { ComponentsResolver } from './../../guards/components.resolver';
import { CompaniesResolver } from './../../guards/companies.resolver';
import { ItemTypesResolver } from './guards/item-types.resolver';
import { ProjectItemsResolver } from './guards/project_items.resolver';


// COMPONENTS
import { ItemsComponent } from './items.component';
import { ItemsFormBasicComponent } from './items-form-basic/items-form-basic.component';
import { ItemsFormComponent } from './items-form/items-form.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemTimeFormBasicComponent } from './item-time-form-basic/item-time-form-basic.component';
import { ItemTimeListComponent } from './item-time-list/item-time-list.component';
import { ItemResourcesComponent } from './item-resources/item-resources.component';
import { PerfilCircleComponent } from '../shared/perfil-circle/perfil-circle.component';
import { TemporalItemListComponent } from './temporal-item-list/temporal-item-list.component';

// MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

// MODULES
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ItemsRoutingModule } from './items-routing.module';


// import { MatButtonToggleModule } from '@angular/material/button-toggle';

const materialModules = [
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatMenuModule,
  MatDividerModule,
  MatTabsModule,
  MatNativeDateModule,
  MatListModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatIconModule,
  CdkStepperModule,
  MatStepperModule,
  MatChipsModule
];

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsFormComponent,
    ItemsFormBasicComponent,
    ItemsListComponent,
    TemporalItemListComponent,
    ItemTimeListComponent,
    ItemTimeFormBasicComponent,
    ItemResourcesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    materialModules,
    DragDropModule,
    MatDialogModule,
    SharedModule,
    ItemsRoutingModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    SponsorsCompaniesResolver,
    ComponentsResolver,
    DatePipe,
    DeveloperCompaniesResolver,
    // ItemsFormComponent,
    ItemPrioritiesResolver,
    ItemResolutionsResolver,
    ItemSeveritiesResolver,
    ItemStatusResolver,
    ItemTypesResolver,
    MatListModule,
    ProjectItemsResolver,
    ProjectResolver,
    UsersResolver
 ],
  exports: [
    // ItemsComponent
    materialModules,
    SharedModule,
    // MatInputModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemsModule { }
