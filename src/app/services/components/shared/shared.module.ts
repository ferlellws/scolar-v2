import { GoogleChartsModule } from './google-charts/google-charts.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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

// COMPONENTS
import { ButtonsFilterGraphsComponent } from './buttons-filter-graphs/buttons-filter-graphs.component';
import { CardPercentageComponent } from './card-percentage/card-percentage.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './google-charts/line-chart/line-chart.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilCircleComponent } from './perfil-circle/perfil-circle.component';
import { ColumnChartsComponent } from './google-charts/column-charts/column-charts.component';
import { PieChartsComponent } from './google-charts/pie-charts/pie-charts.component';

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
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    MenuComponent,
    PerfilCircleComponent,
    DynamicTableComponent,
    ButtonsFilterGraphsComponent,
    CardPercentageComponent,
    // ColorPickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    materialModules,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    MenuComponent,
    PerfilCircleComponent,
    DynamicTableComponent,
    CardPercentageComponent,
    materialModules,
    GoogleChartsModule,
    ButtonsFilterGraphsComponent,
    FormsModule,
    ReactiveFormsModule,
    // ColorPickerComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})
export class SharedModule { }
