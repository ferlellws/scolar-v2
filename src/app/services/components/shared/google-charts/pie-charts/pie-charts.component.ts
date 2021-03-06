import { GoogleChartService } from './../../../../services/google-chart.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TableData } from 'src/app/models/table-data';

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

  @Input() id: string;
  @Input() title: string = '';
  @Input() curveType: string;
  @Input() legend: string;
  @Input() fMaterial: boolean;
  @Input() dataTable: any [];
  @Input() width: string = "800px";
  @Input() height: string = "500px";
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

  private drawChart() {

    let data = this.gLib.visualization.arrayToDataTable(this.dataTable);

    var options = {
      title: this.title,
      legend: { position: this.positionLegend },
      pieHole: this.pieHole,
      is3D: this.is3D,
      pieSliceText: this.pieSliceText,
      pieSliceTextStyle: this.pieSliceTextStyle,
      colors: this.colors
    };

    let chart = new this.gLib.visualization.PieChart(document.getElementById(this.id));

    chart.draw(data, options);
  }

}
