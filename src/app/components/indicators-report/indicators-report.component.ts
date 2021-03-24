import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TableData } from 'src/app/models/table-data';
import { IndicatorsReportsService } from 'src/app/services/indicators-reports.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { ColumnChartsComponent } from '../shared/google-charts/column-charts/column-charts.component';
import { PieChartsComponent } from '../shared/google-charts/pie-charts/pie-charts.component';

@Component({
  selector: 'tecno-indicators-report',
  templateUrl: './indicators-report.component.html',
  styleUrls: ['./indicators-report.component.scss']
})
export class IndicatorsReportComponent implements OnInit {

  step = -1;

  indexTab = 0;
  
  labelStep = {
    back: "Atrás",
    next: "Siguiente"
  }

  //statesByVicepresidenciesTable!: any;
  //typificationsByVicepresidencies!: any;
  //prioritiesByVicepresidencies!: any;
  //programs!: any;
  //companies!: any;
  dataGraphicPriorities!: any;
  dataGraphicCompanies!: any;
  emptyGraphPriorities = false;
  emptyGraphCompanies = false;

  statesByVicepresidenciesTable: TableData = {
    headers: [
      "Estado",
      "Presidencia",
      "Vp Comercial",
      "Vp Financiera",
      "Vp Operaciones",
      "Total",
    ],
    dataTable: [
      {
        states: "Por Aprobar",
        vp1: 1,
        vp2: 2,
        vp3: 5,
        vp4: 6,
        total: 14
      },
      {
        states: "Aprobado",
        vp1: 1,
        vp2: 1,
        vp3: 6,
        vp4: 4,
        total: 12
      },
      {
        states: "En Ejecución",
        vp1: 10,
        vp2: 6,
        vp3: 6,
        vp4: 8,
        total: 30
      },
    ],
    footer: {
      states: "Total General",
        vp1: 21,
        vp2: 23,
        vp3: 1,
        vp4: 23,
        total: 123
    }
  }

  typificationsByVicepresidencies: TableData = {
    headers: [
      "Tipificación",
      "Presidencia",
      "Vp Comercial",
      "Vp Financiera",
      "Vp Operaciones",
      "Total",
    ],
    dataTable: [
      {
        states: "Proy. Grande",
        vp1: 1,
        vp2: 2,
        vp3: 5,
        vp4: 6,
        total: 14
      },
      {
        states: "Req. Mediano",
        vp1: 1,
        vp2: 1,
        vp3: 6,
        vp4: 4,
        total: 12
      },
      {
        states: "Req. Pequeño",
        vp1: 10,
        vp2: 6,
        vp3: 6,
        vp4: 8,
        total: 30
      },
    ],
    footer: {
      states: "Total General",
        vp1: 21,
        vp2: 23,
        vp3: 1,
        vp4: 23,
        total: 123
    }
  }

  priorities: TableData = {
    headers: [
      "Prioridad",
      "Cuenta de Proyectos",
    ],
    dataTable: [
      {
        priority: "Alta",
        total: 14
      },
      {
        priority: "Media",
        total: 12
      },
      {
        priority: "Baja",
        total: 30
      },
    ],
    footer: {
      priority: "Total General",
      total: 123
    }
  }

  companies: TableData = {
    headers: [
      "Proveedor",
      "Pr 1",
      "Pr 2",
      "Pr 3",
      "Pr 4",
      "Cantidad de Proyectos",
      "Porcentaje",
    ],
    dataTable: [
      {
        company: "Tecno",
        pr1: 6,
        pr2: 4,
        pr3: 1,
        pr4: 0,
        totalProjects: 11,
        percentage: "16%"
      },
      {
        company: "Heinsohn",
        pr1: 3,
        pr2: 2,
        pr3: 3,
        pr4: 0,
        totalProjects: 8,
        percentage: "12%"
      },
      {
        company: "Valorem",
        pr1: 6,
        pr2: 4,
        pr3: 3,
        pr4: 0,
        totalProjects: 13,
        percentage: "19%"
      },
    ]
  }

  programs: any = [
    {
      name: "Hermes",
      advance_spected: "15%",
      advance_real: "12%",
      desviation: {
        color: "green",
        value: "3%"
      },
      vicepresidencies: [
        {
          name: "Presidencia",
          advance_spected: "15%",
          advance_real: "12%",
          desviation: {
            color: "green",
            value: "3%"
          },
          tableData: {
            headers: [
              "Proyecto",
              "Avance Esperado",
              "Avance Real",
              "Desviación",
            ],
            dataTable: [
              {
                name: "BCT",
                advance_spected: "15%",
                advance_real: "12%",
                desviation: {
                  color: "green",
                  value: "3%"
                },
              },
              {
                name: "KOBAProject",
                advance_spected: "15%",
                advance_real: "50%",
                desviation: {
                  color: "red",
                  value: "45%"
                },
              },
            ]
          }
        },
        {
          name: "Vp Financiera",
          advance_spected: "35%",
          advance_real: "32%",
          desviation: {
            color: "red",
            value: "1%"
          },
          tableData: {
            headers: [
              "Proyecto",
              "Avance Esperado",
              "Avance Real",
              "Avance Real",
              "Desviación",
            ],
            dataTable: [
              {
                name: "D1Web",
                advance_spected: "15%",
                advance_real: "12%",
                desviation: {
                  color: "green",
                  value: "3%"
                },
              },
              {
                name: "Niff16",
                advance_spected: "15%",
                advance_real: "40%",
                desviation: {
                  color: "yellow",
                  value: "45%"
                },
              },
            ]
          }
        },
      ],
    },

    {
      name: "Compacto",
      advance_spected: "15%",
      advance_real: "12%",
      desviation: {
        color: "red",
        value: "50%"
      },
      vicepresidencies: [
        {
          name: "Presidencia",
          advance_spected: "15%",
          advance_real: "12%",
          desviation: {
            color: "green",
            value: "3%"
          },
          tableData: {
            headers: [
              "Proyecto",
              "Avance Esperado",
              "Avance Real",
              "Avance Real",
              "Desviación",
            ],
            dataTable: [
              {
                name: "BCT",
                advance_spected: "15%",
                advance_real: "12%",
                desviation: {
                  color: "green",
                  value: "3%"
                },
              },
              {
                name: "KOBAProject",
                advance_spected: "15%",
                advance_real: "50%",
                desviation: {
                  color: "red",
                  value: "45%"
                },
              },
            ]
          }
        },
      ],
    }
  ]

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    public datepipe: DatePipe,
    private indicatorsReportsService:IndicatorsReportsService,
  ) { }

  ngOnInit(): void {
    this.indicatorsReportsService.getTableCompanies()
      .subscribe((data: any) => {
        this.companies = data;
        if(this.companies.dataTable.length == 0) {
          this.emptyGraphCompanies = true;
        } else {
          this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['pr1', 'pr2', 'pr3', 'pr4'])
          this.emptyGraphCompanies = false;
        }
      });
    this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['pr1', 'pr2', 'pr3', 'pr4'])
  }

  openStates(step: number) {
    this.setStep(step);

    this.indicatorsReportsService.getTableStatesByVicepresidencies()
      .subscribe((data: TableData) => {
        this.statesByVicepresidenciesTable = data;
      })
  }

  openTypifications(step: number) {
    this.setStep(step);

    this.indicatorsReportsService.getTableTypificationsByVicepresidencies()
      .subscribe((data: TableData) => {
        this.statesByVicepresidenciesTable = data;
      })
  }
  
  openPriorities(step: number) {
    this.setStep(step);

    this.indicatorsReportsService.getTablePriorities()
      .subscribe((data: TableData) => {
        this.priorities = data;
        if(this.priorities.dataTable.length == 0) {
          this.emptyGraphPriorities = true;
        } else {
          
          this.emptyGraphPriorities = false;
        }
      });
    this.dataGraphicPriorities = PieChartsComponent.TableToChart(this.priorities, ['total'])
  }

  openPrograms(step: number) {
    this.setStep(step);

    this.indicatorsReportsService.getPrograms()
      .subscribe((data: any) => {
        this.programs = data;
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

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.indexTab =  tabChangeEvent.index;
  }
}
