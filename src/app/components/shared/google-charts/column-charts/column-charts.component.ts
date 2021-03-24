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
    '#F44336',
    '#3F51B5',
    '#4CAF50',
    '#9C27B0',
    '#E91E63',
    '#2196F3',
    '#673AB7',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722'
  ];
  @Input() positionLegend: string = 'right';
  @Input() bars: string = "vertical"

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
      backgroundColor: {
        fill: 'red',
        fillOpacity: 0.8
      },
      curveType: this.curveType,
      colors: this.colors,
      legend: { position: this.positionLegend },
      bars: this.bars,    
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
