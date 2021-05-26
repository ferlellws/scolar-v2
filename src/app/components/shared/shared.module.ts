import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
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
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';
import { ProfileCircleComponent } from './profile-circle/profile-circle.component';
import { TimelineChartsComponent } from './google-charts/timeline-charts/timeline-charts.component';

// MODULES
import { GoogleChartsModule } from './google-charts/google-charts.module';
import { TextListComponent } from './text-list/text-list.component';
import { TextListDateComponent } from './text-list-date/text-list-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GephiComponent } from './gephi/gephi.component';
import { DateRangeComponent } from '../project-details/phase-management/date-range/date-range.component';

const COMPONENTS = [
  MenuComponent,
  ProfileCircleComponent,
  FormDebugComponent,
  InfoPageComponent,
  DynamicTableComponent,
  AlertDialogComponent,
  TextListComponent,
  TextListDateComponent,
  UnauthorizedComponent,
  GephiComponent,
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

const MODULES = [
  GoogleChartsModule,
  materialModules
]

@NgModule({
  declarations: [
    COMPONENTS,
    MessageComponent,
    TextListComponent,
    TextListDateComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MODULES,
    RouterModule,
    materialModules,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    COMPONENTS,
    MODULES
  ]
})
export class SharedModule { }
