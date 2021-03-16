import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-desviation-causes',
  templateUrl: './desviation-causes.component.html',
  styleUrls: ['./desviation-causes.component.scss']
})
export class DesviationCausesComponent implements OnInit {

  step = 0;

  dataTableSource: any = {
    "headers": [
      "Fuente de atraso",
      "Suma de Impacto Tiempo (Días)",
    ],
    "dataTable": [
      {
        "fuente": "Tecnología",
        "tiempo": 366,
      },
      {
        "fuente": "Unidad de Negocio (Funcionales",
        "tiempo": 367,
      },
      {
        "fuente": "Financiero",
        "tiempo": 0,
      },
      {
        "fuente": "Jurídico",
        "tiempo": 0,
      },
      {
        "fuente": "Servicios Administrativos (Compras)",
        "tiempo": 0,
      },
      {
        "fuente": "Gestión Humana",
        "tiempo": 0,
      },
      {
        "fuente": "PMO",
        "tiempo": 182,
      },
      {
        "fuente": "Lineamiento Directivo",
        "tiempo": 50,
      },

    ],
    "footer": {
        "fuente": "Total",
        "tiempo": 500
    }
  };

  dataGraphicSource: any = [
    ['Fuente de atraso', 'Suma de Impacto Tiempo (Días)'],
    ['Tecnología', 366],
    ['Unidad de Negocio (Funcionales)', 367],
    ['Financiero', 0],
    ['Jurídico', 0],
    ['Servicios Administrativos (Compras)', 0],
    ['Gestión Humana', 0],
    ['PMO', 182],
    ['Lineamiento Directivo', 50]
  ]

  yearsForm = new FormControl();
  monthsForm = new FormControl();
  projectsForm = new FormControl();
  typificationsForm = new FormControl();
  
  optionsYears = ["2021", "2020"];
  optionsMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  @Input() yearsSelected: any[] = [];
  @Input() monthsSelected: any[] = [];
  @Input() projectsSelected: any[] = [];
  @Input() typificationsSelected: any[] = [];

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
  
  constructor() { }

  ngOnInit(): void {
    
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
