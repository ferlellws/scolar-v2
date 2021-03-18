import { GoogleChartService } from './../../../../services/google-chart.service';
import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { TableData } from 'src/app/models/table-data';
import { environment } from 'src/environments/environment';

export interface PieSliceTextStyle {
  color: string;
  fontName: string;
  fontSize: string;
}

@Component({
  selector: 'tecno-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit {

  @Input() id!: string;
  @Input() title: string = '';
  @Input() curveType!: string;
  @Input() legend!: string;
  @Input() fMaterial!: boolean;
  @Input() dataTable!: any [];
  @Input() width: string = "";
  @Input() height: string = "";
  @Input() chartClass: string = "";
  @Input() pieHole: number = 0;
  @Input() positionLegend: string = 'right';
  @Input() is3D: boolean = false;
  @Input() pieSliceText: string = 'percentage';
  @Input() pieSliceTextStyle: PieSliceTextStyle = {
    color: 'white',
    fontName: '',
    fontSize: ''
  };
  @Input() colors: string [] = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722'
  ];

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
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  static footerToDataChart(data: TableData): any{
    var keys: string[] = Object.keys(data.footer);
    var total = data.footer[keys[keys.length -1]];
    var result = [];
    result.push(["ColumnHeader1", "ColumnHeader1"]);
    for(let index = 1; index < keys.length -1; index++) {
      result.push(
        [
          data.headers[index],
          parseFloat(((data.footer[keys[index]] / total) * 100).toFixed(1)),
        ]
      );
    }
    return result;
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
      title: this.title,
      legend: { position: this.positionLegend },
      pieHole: this.pieHole,
      is3D: this.is3D,
      pieSliceText: this.pieSliceText,
      pieSliceTextStyle: this.pieSliceTextStyle,
      colors: this.colors,
      chartArea: {
        left: "100",
        "width": "100%",
        "height": "100%"
      }
    };

    let chart = new this.gLib.visualization.PieChart(document.getElementById(this.id));

    chart.draw(data, options);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.drawChart();
  }

}
