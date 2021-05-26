import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { ProjectsComponent } from './projects.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';

// MATERIAL
import { MatDividerModule } from '@angular/material/divider';
import { ProjectsCardComponent } from './projects-card/projects-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';

// MODULES
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { ColorPickerComponent } from '../shared/color-picker/color-picker.component';
import { ProjectsDeleteWarningComponent } from './projects-delete-warning/projects-delete-warning.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectsRoutingModule } from './projects-routing.module';
// import { MccColorPickerModule} from 'material-community-components/color-picker';

const materialModules = [
  // MatTableModule,
  // MatPaginatorModule,
  // MatSortModule,
  // MatTableModule,
  // MatPaginatorModule,
  MatSnackBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatDividerModule,
  MatCardModule,
  MatMenuModule,
  // MATERIAL COMMUNITY COMPONENTS
  // MccColorPickerModule
];

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsFormComponent,
    ProjectsCardComponent,
    ColorPickerComponent,
    ProjectsDeleteWarningComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    materialModules,
    ProjectsRoutingModule
  ],
  exports: [
    materialModules
  ]
})
export class ProjectsModule { }
