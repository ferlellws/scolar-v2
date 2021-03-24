import { Component, OnInit } from '@angular/core';
import { TableData } from 'src/app/models/table-data';
import { ColumnChartsComponent } from '../shared/google-charts/column-charts/column-charts.component';

@Component({
  selector: 'tecno-indicators-report',
  templateUrl: './indicators-report.component.html',
  styleUrls: ['./indicators-report.component.scss']
})
export class IndicatorsReportComponent implements OnInit {

  step = -1;
  
  labelStep = {
    back: "Atrás",
    next: "Siguiente"
  }

  vicepresidencies = ["Presidencia", "Vp Comercial", "Vp Finacniera", "Vp Operaciones"]

  dataTable: TableData = {
    headers: [
      "Cosa",
      "Vp",
      "p1",
      "p2",
      "p3",
      "p4",
      "desviation"
    ],
    dataTable: [
      {
        cosa1: "Hola",
        vp: "Que Tal",
        p1: 12,
        p2: 23,
        p3: 3,
        p4: 6,
        desviation: {
          color: "red",
          value: "23%"
        }
      },
      {
        cosa1: "Hola2",
        vp: "Que Tal2",
        p1: 3,
        p2: 2,
        p3: 34,
        p4: 12,
        desviation: {
          color: "yellow",
          value: "8%"
        }
      }
    ]
  }

  graph!: (string|number)[][];

  constructor() { }

  ngOnInit(): void {
    this.graph = ColumnChartsComponent.TableToChart(this.dataTable, ['p1', 'p2', 'p3', 'p4'])
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

}
