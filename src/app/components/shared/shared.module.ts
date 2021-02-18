import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

// MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageComponent } from './message/message.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ProfileCircleComponent } from './profile-circle/profile-circle.component';

const COMPONENTS = [
  MenuComponent,
  ProfileCircleComponent,
  FormDebugComponent,
  InfoPageComponent,
  DynamicTableComponent
];

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatTableModule,
  MatDatepickerModule,
  MatTableModule,
  MatFormFieldModule,
  MatCardModule
];

@NgModule({
  declarations: [
    COMPONENTS,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    materialModules,
    RouterModule
  ],
  exports: [
    COMPONENTS,
    materialModules
  ]
})
export class SharedModule { }
