import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartService } from 'src/app/services/google-chart.service';

@Component({
  selector: 'tecno-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() title: string;
  @Input() curveType: string;
  @Input() legend: string;
  @Input() fMaterial: boolean;
  @Input() dataTable: any [];

  private gLib: any;

  constructor(private gChartService : GoogleChartService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {
      'packages': [
        'corechart',
        'table',
        'line'
      ]
    });
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {

  }

  private drawChart(){
    let data = this.gLib.visualization.arrayToDataTable(this.dataTable);

    var options = {
      title: this.title || '',
      curveType: this.curveType || 'none',
      legend: { position: 'bottom' }
    };

    let chart;

    if (this.fMaterial) {
      chart = new this.gLib.charts.Line(document.getElementById('divLineChart'));
    } else {
      chart = new this.gLib.visualization.LineChart(document.getElementById('divLineChart'));
    }

    chart.draw(data, options);
  }

}
