import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableData } from 'src/app/models/table-data';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { PieChartsComponent } from '../shared/google-charts/pie-charts/pie-charts.component';

@Component({
  selector: 'tecno-desviation-causes',
  templateUrl: './desviation-causes.component.html',
  styleUrls: ['./desviation-causes.component.scss']
})
export class DesviationCausesComponent implements OnInit {

  step = 0;
  dataTableSource!: TableData;
  dataGraphicSource!: any;

  dataTableVicePresidency!: TableData;
  dataTableArea!: TableData;
  dataTabletypification!: TableData;

  dataTableSource1: TableData = {
    "headers": [
      "Fuente de atraso",
      "Suma de Impacto Tiempo (Días)",
      "Suma de Variación de Costos (COP)"
    ],
    "dataTable": [
      {
        "fuente": "Tecnología",
        "tiempo": 366,
        "costos": 0
      },
      {
        "fuente": "Unidad de Negocio (Funcionales",
        "tiempo": 367,
        "costos": 345700000
      },
      {
        "fuente": "Financiero",
        "tiempo": 0,
        "costos": 0
      },
      {
        "fuente": "Jurídico",
        "tiempo": 0,
        "costos": 0
      },
      {
        "fuente": "Servicios Administrativos (Compras)",
        "tiempo": 0,
        "costos": 0
      },
      {
        "fuente": "Gestión Humana",
        "tiempo": 0,
        "costos": 0
      },
      {
        "fuente": "PMO",
        "tiempo": 182,
        "costos": 29500000
      },
      {
        "fuente": "Lineamiento Directivo",
        "tiempo": 50,
        "costos": 0
      },

    ],
    "footer": {
        "fuente": "Total",
        "tiempo": 965,
        "costos": 375200000
    }
  };

  dataVega = [
    ["Apoyo definición",4],
    ["Atrasos en Compras",3],
    ["Atrasos en definición de alcance",6],
    ["Demora Elaboración Contrato",2],
    ["Disponibilidad de Recurso",14],
    ["Disponibilidad de Recurso Área IT",4],
    ["Disponibilidad de Recurso Proveedor IT",5],
    ["Falla en Especificaciones",12],
    ["Fallas de Calidad IT",2],
    ["Fallas de Calidad Proveedor",10],
    ["Fallas de Planeación",4],
    ["Variable Exógena",2],
    ["Apoyo definición2",4],
    ["Atrasos en Compras2",3],
    ["Atrasos en definición de alcance2",6],
    ["Demora Elaboración Contrato2",2],
    ["Disponibilidad de Recurso2",14],
    ["Disponibilidad de Recurso Área IT2",4],
    ["Disponibilidad de Recurso Proveedor IT2",5],
  ];

  yearsForm = new FormControl();
  monthsForm = new FormControl();
  projectsForm = new FormControl();
  typificationsForm = new FormControl();
  
  optionsYears = ["2021", "2020"];
  optionsMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  yearsSelected: any[] = [];
  monthsSelected: any[] = [];
  projectsSelected: any[] = [];
  typificationsSelected: any[] = [];

  labelsTitle = {
    source: "Fuente",
    vicepresidency: "Vicepresidencia",
    area: "Área",
    typification: "Tipificación"
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
  
  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    public datepipe: DatePipe,
    
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) =>{
      this.dataTableSource = data.desviationCausesBySource.data;

      this.dataGraphicSource = PieChartsComponent.TableToChart(this.dataTableSource);
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    })

    environment.consoleMessage(this.dataTableSource, ">>>>>> datos back <<<<<<<");
  }

  setStep(index: number) {
    this.step = index;
    this.remove();
  }

  nextStep() {
    this.step++;
    this.remove();
  }

  prevStep() {
    this.step--;
    this.remove();
  }

  onChangeSelectYears(){
    this.yearsSelected = this.yearsForm.value;
    environment.consoleMessage(this.yearsSelected);
  }

  onChangeSelectMonths(){
    this.monthsSelected = this.monthsForm.value;
    environment.consoleMessage(this.monthsSelected);
  }

  filter() {

  }

  remove(){
    this.yearsForm.setValue(null);
    this.yearsSelected = [];
    this.monthsForm.setValue(null);
    this.monthsSelected = [];
    this.projectsForm.setValue(null);
    this.projectsSelected = [];
    this.typificationsForm.setValue(null);
    this.typificationsSelected = [];
  }

}
