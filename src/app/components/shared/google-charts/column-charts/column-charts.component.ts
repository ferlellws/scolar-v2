import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TableData } from 'src/app/models/table-data';
import { GoogleChartService } from 'src/app/services/google-chart.service';

@Component({
  selector: 'tecno-column-charts',
  templateUrl: './column-charts.component.html',
  styleUrls: ['./column-charts.component.scss']
})
export class ColumnChartsComponent implements OnInit {

  @Input() id!: string;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() curveType: string = 'none';
  @Input() legend!: string;
  @Input() fMaterial: boolean = true;
  @Input() dataTable!: any [];
  @Input() width: string = "800px";
  @Input() height: string = "500px";
  @Input() chartClass: string = "";
  @Input() colors: string [] = [
    '#2196F3',
    '#F44336'
  ];
  @Input() positionLegend: string = 'right';

  private gLib: any;

  constructor(private gChartService : GoogleChartService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {
      'packages': [
        'corechart',
        'table',
        'bar'
      ]
    });
  }

  ngOnInit(): void {
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  static TableToChart(dataTable: TableData, keysSelected?: string[]){
    var keysAll = Object.keys(dataTable.dataTable[0]);
    var keys = [];
    var headers = [];

    if (keysSelected != null){
      headers.push(dataTable.headers[0]);
      keys.push(keysAll[0]);
      for (let index = 0; index < keysSelected.length; index++) {
        var indexFound = keysAll.indexOf(keysSelected[index]);
        keys.push(keysAll[indexFound]);
        headers.push(dataTable.headers[indexFound]);
      }
    }else{
      keys = keysAll.slice(0, keysAll.length -1);
      headers = dataTable.headers.slice(0, keysAll.length -1);
    }

    var result = [];
    result.push(headers);

    for (let index = 0; index < dataTable.dataTable.length; index++) {
      var arrayAux =[];
      for (let j = 0; j < keys.length; j++) {
        arrayAux.push(dataTable.dataTable[index][keys[j]]);
      }
      result.push(arrayAux);
    }

    return result;
  }

  private drawChart() {

    let data = this.gLib.visualization.arrayToDataTable(this.dataTable);

    var options = {
      chart: {
        title: this.title,
        subtitle: this.subtitle,
      },
      curveType: this.curveType,
      colors: this.colors,
      legend: { position: this.positionLegend },
    };

    let chart;

    if (this.fMaterial) {
      chart = new this.gLib.charts.Bar(document.getElementById(this.id));
    } else {
      chart = new this.gLib.visualization.ColumnChart(document.getElementById(this.id));
    }

    chart.draw(data, options);
  }

}
