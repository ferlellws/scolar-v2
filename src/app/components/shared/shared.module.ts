import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// COMPONENTS
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';
import { ProfileCircleComponent } from './profile-circle/profile-circle.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const COMPONENTS = [
  MenuComponent,
  ProfileCircleComponent,
  FormDebugComponent,
  InfoPageComponent,
  DynamicTableComponent,
  AlertDialogComponent
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
  MatCardModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatDialogModule
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
