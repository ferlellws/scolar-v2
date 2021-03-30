import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { DelayTypification } from 'src/app/models/delay-typification';
import { DesviationCause } from 'src/app/models/desviation-cause';
import { Project } from 'src/app/models/project';
import { TableData } from 'src/app/models/table-data';
import { DelayTypificationsService } from 'src/app/services/delay-typifications.service';
import { DesviationCausesService } from 'src/app/services/desviation-causes.service';
import { MainService } from 'src/app/services/main.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { environment } from 'src/environments/environment';
import { PieChartsComponent } from '../shared/google-charts/pie-charts/pie-charts.component';
import { VegaChartsComponent } from '../shared/google-charts/vega-charts/vega-charts.component';
import { DesviationCausesModule } from './desviation-causes.module';

@Component({
  selector: 'tecno-desviation-causes',
  templateUrl: './desviation-causes.component.html',
  styleUrls: ['./desviation-causes.component.scss']
})
export class DesviationCausesComponent implements OnInit {
  actions!: Actions;
  step = -1;
  dataTableSource!: TableData;
  dataGraphicSource!: any;
  dataTableVicePresidency!: TableData;
  dataGraphicVicePresidency!: any;
  dataTableArea!: TableData;
  dataGraphicArea!: any;
  dataTableTypification!: TableData;
  dataGraphicTypification!: any;

  emptyGraphSource = false;
  emptyGraphVicepresidency = false;
  emptyGraphArea = false;
  emptyGraphTypification = false;

  sourceGroup!: FormGroup;
  vicepresidencyGroup!: FormGroup;
  areaGroup!: FormGroup;
  typificationGroup!: FormGroup;
  
  optionsYears: any[] = [];
  optionTypifications: any[] = [];
  projects: Project[] = [];
  optionsMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  maxScaleTypifications!: number;

  labelsTitle = {
    source: "Fuentes de atraso",
    vicepresidency: "Vicepresidencias",
    area: "Áreas",
    typification: "Tipificaciones",
    sourceByTypification: "Fuentes de atraso con Tipificaciones relacionadas"
  }

  labelsDescription = "Gráfico Impacto de Tiempo por"
  labelStep = {
    back: "Atrás",
    next: "Siguiente"
  }

  labelButton = {
    remove: "Limpiar Filtros",
    filter: "Filtrar"
  }
  
  typificationsBySources = [
    {
      name: "Tecnología",
      impacts_time: 23,
      cost_variaton: "$1.456.000",
      dataTable: {
        headers: [
          "Tipificación",
          "Suma de Impacto Tiempo (Días)",
          "Suma de Variación de Costos (COP)",
        ],
        dataTable: [
          {
            name: "Fallas de Calidad IT",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Fallas de Calidad Proveedor",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Falla en Especificaciones",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Atrasos en Contratación de Recursos",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
        ]
      }
    },
    {
      name: "Financiero",
      impacts_time: 23,
      cost_variaton: "$1.456.000",
      dataTable: {
        headers: [
          "Tipificación",
          "Suma de Impacto Tiempo (Días)",
          "Suma de Variación de Costos (COP)",
        ],
        dataTable: [
          {
            name: "Fallas de Calidad IT",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Fallas de Calidad Proveedor",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Falla en Especificaciones",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Atrasos en Contratación de Recursos",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
        ]
      }
    },
    {
      name: "Gestión Humana",
      impacts_time: 23,
      cost_variaton: "$1.456.000",
      dataTable: {
        headers: [
          "Tipificación",
          "Suma de Impacto Tiempo (Días)",
          "Suma de Variación de Costos (COP)",
        ],
        dataTable: [
          {
            name: "Fallas de Calidad IT",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Fallas de Calidad Proveedor",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Falla en Especificaciones",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
          {
            name: "Atrasos en Contratación de Recursos",
            impacts_time: "34",
            cost_variaton: "$1.456.000",
          },
        ]
      }
    }
  ]

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    public datepipe: DatePipe,
    private desviationCausesService: DesviationCausesService,
    private projectsService:ProjectsService,
    private delayTypificationsService:DelayTypificationsService,
    private fg: FormBuilder 
  ) {
    this.sourceGroup = this.fg.group({
      yearsForm: [null],
      monthsForm: [null],
      projectsForm: [null],
      typificationsForm: [null],
    });
    this.vicepresidencyGroup = this.fg.group({
      yearsForm: [null],
      monthsForm: [null],
      projectsForm: [null],
      typificationsForm: [null],
    });
    this.areaGroup = this.fg.group({
      yearsForm: [null],
      monthsForm: [null],
      projectsForm: [null],
      typificationsForm: [null],
    });
    this.typificationGroup = this.fg.group({
      yearsForm: [null],
      monthsForm: [null],
      projectsForm: [null],
      typificationsForm: [null],
    });
  }

  async ngOnInit() {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.mainService.showLoading();
    await this.route.data.subscribe((data: any) =>{
      this.dataTableSource = data.desviationCausesBySource.data;
      this.dataGraphicSource = PieChartsComponent.TableToChart(this.dataTableSource);

      this.dataTableVicePresidency = data.desviationCausesByVicepresidencies.data;
      this.dataGraphicVicePresidency = PieChartsComponent.TableToChart(this.dataTableVicePresidency, ['sum_impacts_time']);

      this.dataTableArea = data.desviationCausesByAreas.data;
      this.dataGraphicArea = PieChartsComponent.TableToChart(this.dataTableArea, ['sum_impacts_time']);

      this.dataTableTypification = data.desviationCausesByTypifications.data;
      this.dataGraphicTypification = VegaChartsComponent.TableToChart(this.dataTableTypification, ['sum_impacts_time']);

      this.maxScaleTypifications = Math.max.apply(null,this.dataGraphicTypification.map((data: any) => data[1])) + 10;

      this.projectsService.getProjectsSelect()
        .subscribe((projects: Project[]) => {
          this.projects = projects
      });

      this.delayTypificationsService.getDelayTypifications()
        .subscribe((delayTypification: DelayTypification[]) => {
          this.optionTypifications = delayTypification;
        });

      this.desviationCausesService.getDesviationCauses()
      .subscribe((dCauses: DesviationCause[]) => {
        for (let index = 0; index < dCauses.length; index++) {
          var year = dCauses[index].date
          if((year != null && year != "")) {
            if(!(this.optionsYears.includes(year.split("-")[0]))) {
              this.optionsYears.push(year.split("-")[0]);
            }
          }
        }
      });

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
    
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  filter(group: FormGroup, nameGroup: string) {
    var years = this.arrayToString(group.get("yearsForm")!.value);
    var months = this.arrayToString(group.get("monthsForm")!.value);
    var projects = this.arrayToString(group.get("projectsForm")!.value);
    var typifications = this.arrayToString(group.get("typificationsForm")!.value);

    if(nameGroup == "sourceGroup") {
      this.desviationCausesService.getDesviationCausesBySource(years, months, projects, typifications)
        .subscribe(data => {
          this.dataTableSource = data.data;
          if(this.dataTableSource.dataTable.length == 0){
            this.emptyGraphSource = true;
          }else{
            this.dataGraphicSource = PieChartsComponent.TableToChart(this.dataTableSource);
            this.emptyGraphSource = false;
          }
        });
      
    } else if (nameGroup == "vicepresidencyGroup") {
      this.desviationCausesService.getDesviationCausesByVicepresidencies(years, months, projects, typifications)
        .subscribe(data => {
          this.dataTableVicePresidency = data.data;
          if(this.dataTableVicePresidency.dataTable.length == 0){
            this.emptyGraphVicepresidency = true;
          }else{
            this.dataGraphicVicePresidency = PieChartsComponent.TableToChart(this.dataTableVicePresidency, ['sum_impacts_time']);
            this.emptyGraphVicepresidency = false;
          }
        });
    } else if (nameGroup == "areaGroup") {
      this.desviationCausesService.getDesviationCausesByAreas(years, months, projects, typifications)
        .subscribe(data => {
          this.dataTableArea = data.data;
          if(this.dataTableArea.dataTable.length == 0){
            this.emptyGraphArea = true;
          }else{
            this.dataGraphicArea = PieChartsComponent.TableToChart(this.dataTableArea, ['sum_impacts_time']);
            this.emptyGraphArea = false;
          }
        });
    } else if (nameGroup == "typificationGroup") {
      this.desviationCausesService.getDesviationCausesByTypifications(years, months, projects, typifications)
        .subscribe(data => {
          this.dataTableTypification = data.data;
          if(this.dataTableTypification.dataTable.length == 0){
            this.emptyGraphTypification = true;
          }else{
            this.dataGraphicTypification = VegaChartsComponent.TableToChart(this.dataTableTypification, ['sum_impacts_time']);
            this.emptyGraphTypification = false;
          }
        });
    }
    
  }

  removeValueGroup(group: FormGroup, nameGroup: string) {
    var keys: string[] = Object.keys(group.controls);
    for (let index = 0; index < keys.length; index++) {
      group.get(keys[index])?.setValue(null);
    }
    if(nameGroup == "sourceGroup") {
      this.desviationCausesService.getDesviationCausesBySource("", "", "", "")
        .subscribe(data => {
          this.dataTableSource = data.data;
          this.dataGraphicSource = PieChartsComponent.TableToChart(this.dataTableSource);
          this.emptyGraphSource = false;
        });
    } else if (nameGroup == "vicepresidencyGroup") {
      this.desviationCausesService.getDesviationCausesByVicepresidencies("", "", "", "")
        .subscribe(data => {
          this.dataTableVicePresidency = data.data;
          this.dataGraphicVicePresidency = PieChartsComponent.TableToChart(this.dataTableVicePresidency, ['sum_impacts_time']);
          this.emptyGraphVicepresidency = false;
        });
    } else if (nameGroup == "areaGroup") {
      this.desviationCausesService.getDesviationCausesByAreas("", "", "", "")
        .subscribe(data => {
          this.dataTableArea = data.data;
          this.dataGraphicArea = PieChartsComponent.TableToChart(this.dataTableArea, ['sum_impacts_time']);
          this.emptyGraphArea = false;
        });
    } else if (nameGroup == "typificationGroup") {
      this.desviationCausesService.getDesviationCausesByTypifications("", "", "", "")
        .subscribe(data => {
          this.dataTableTypification = data.data;
          this.dataGraphicTypification = VegaChartsComponent.TableToChart(this.dataTableTypification, ['sum_impacts_time']);
          this.emptyGraphTypification = false;
        });
    }
  }

  arrayToString(array: any[]) {
    var data:string = "";
    if(array != null) {
      for (let index = 0; index < array.length; index++) {
        data = data+array[index];
        if(index < array.length-1) {
          data = data+","
        }
      }
    }
    return data;
  }
}