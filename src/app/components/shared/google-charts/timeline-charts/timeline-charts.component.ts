import { ProjectProgressReport } from './../../../../models/project-progress-report';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TableData } from 'src/app/models/table-data';
import { GoogleChartService } from 'src/app/services/google-chart.service';
import { MainService } from 'src/app/services/main.service';
import { PieSliceTextStyle } from '../pie-charts/pie-charts.component';
import { StrategicGuidelines } from 'src/app/models/strategic-guidelines';

export interface DataInitial {
  externalCompanyStates: any;
  externalCompanySchedules: any;
  strategicGuidelines: StrategicGuidelines[]
}

@Component({
  selector: 'tecno-timeline-charts',
  templateUrl: './timeline-charts.component.html',
  styleUrls: ['./timeline-charts.component.scss']
})
export class TimelineChartsComponent implements OnInit {

  // constructor() {

  // }

  // ngOnInit() {

  // }

  @Input() id!: string;
  @Input() title: string = '';
  @Input() curveType!: string;
  @Input() legend!: string;
  @Input() fMaterial!: boolean;
  @Input() dataInitial!: DataInitial;
  @Input() dataTable!: any;
  @Input() width: string = "95%";
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

  container: any;
  dateRangeStart: any;
  dateRangeEnd: any;

  private gLib: any;
  options!: {
    title: string;
    legend: { position: string; };
    // pieHole: this.pieHole,
    // is3D: this.is3D,
    // pieSliceText: this.pieSliceText,
    // pieSliceTextStyle: this.pieSliceTextStyle,
    // colors: this.colors,
    colors: string[];
    timeline: {
      groupByRowLabel: boolean;
      colorByRowLabel: boolean;
      // barLabelStyle: any;
    };
    avoidOverlappingGridLines: boolean;
    height: number;
    // backgroundColor: string[] | string;
  };
  formatDate: any;

  constructor(private gChartService : GoogleChartService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {
      'packages': [
        'timeline'
      ]
    });
  }

  ngOnInit(): void {
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTable = changes.dataTable.currentValue;
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  private drawChart() {

    // let data = this.gLib.visualization.arrayToDataTable(this.dataTable);
    let dataTable = new this.gLib.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    console.log("////////////", this.dataTable);

    this.dataTable.dataChart.forEach((data: any) => {
      dataTable.addRows([data]);
    });

    this.formatDate = new this.gLib.visualization.DateFormat({
      pattern: 'yyyy-MM-dd'
    });

    let dataTableGroup = this.gLib.visualization.data.group(dataTable, [0]);
    this.dateRangeStart = dataTable.getColumnRange(4);
    this.dateRangeEnd = dataTable.getColumnRange(5);
    console.log({dataTableGroup});

    let rowHeight = 44;

    this.options = {
      title: this.title,
      legend: { position: this.positionLegend },
      // pieHole: this.pieHole,
      // is3D: this.is3D,
      // pieSliceText: this.pieSliceText,
      // pieSliceTextStyle: this.pieSliceTextStyle,
      // colors: this.colors,
      colors: ['#cbb69d', '#603913', '#c69c6e'],
      timeline: {
        groupByRowLabel: true,
        colorByRowLabel: false,
        // barLabelStyle: {
        //   fontSize: 50
        // }
      },
      // backgroundColor: '#cbb69d',
      avoidOverlappingGridLines: true,
      height: (dataTableGroup.getNumberOfRows() * rowHeight) + rowHeight
    };

    this.container = document.getElementById(this.id);

    let chart = new this.gLib.visualization.Timeline(this.container);

    this.gLib.visualization.events.addListener(chart, 'ready',  () => {
      // add marker for current date
      this.addMarker(new Date(), '#F44336');
      // this.addMarker(new Date(2020, 8, 31), 'green');
    });

  //   this.gLib.visualization.events.addListener(chart, 'ready', function () {
  //     // set the width of the column with the title "Name" to 100px
  //     var title = 'Name';
  //     var width = '100px';
  //     document.getElementsByClassName("google-visualization-table-th")[0].style.width = width;
  //     // $('.google-visualization-table-th:contains(' + title + ')').css('width', width);
  // });

    chart.draw(dataTable, this.options);
  }

  addMarker(markerDate: Date, color: string) {
    let baseline;
    let baselineBounds;
    let chartElements;
    let markerLabel;
    let markerLine;
    let markerSpan;
    let svg;
    let timeline;
    let timelineUnit;
    let timelineWidth;
    let timespan;

    baseline = null;
    timeline = null;
    svg = null;
    markerLabel = null;
    chartElements = this.container.getElementsByTagName('svg');
    if (chartElements.length > 0) {
      svg = chartElements[0];
    }
    chartElements = this.container.getElementsByTagName('rect');
    if (chartElements.length > 0) {
      timeline = chartElements[0];
    }
    chartElements = this.container.getElementsByTagName('path');
    if (chartElements.length > 0) {
      baseline = chartElements[0];
    }
    chartElements = this.container.getElementsByTagName('text');
    if (chartElements.length > 0) {
      markerLabel = chartElements[0].cloneNode(true);
    }

    if ((svg === null) || (timeline === null) || (baseline === null) || (markerLabel === null) ||
        (markerDate.getTime() < this.dateRangeStart.min.getTime()) ||
        (markerDate.getTime() > this.dateRangeEnd.max.getTime())) {
      return;
    }

    // calculate placement
    timelineWidth = parseFloat(timeline.getAttribute('width'));
    baselineBounds = baseline.getBBox();
    timespan = this.dateRangeEnd.max.getTime() - this.dateRangeStart.min.getTime();
    timelineUnit = (timelineWidth - baselineBounds.x) / timespan;
    markerSpan = markerDate.getTime() - this.dateRangeStart.min.getTime();

    // add label
    markerLabel.setAttribute('fill', color);
    markerLabel.setAttribute('y', this.options.height);
    markerLabel.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan) - 4));
    markerLabel.textContent = this.formatDate.formatValue(markerDate);
    markerLabel.setAttribute('font-weight', 'bold');
    svg.appendChild(markerLabel);

    // add line
    markerLine = timeline.cloneNode(true);
    markerLine.setAttribute('y', 0);
    markerLine.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan)));
    markerLine.setAttribute('height', this.options.height);
    markerLine.setAttribute('width', 1);
    markerLine.setAttribute('stroke', 'none');
    markerLine.setAttribute('stroke-width', '0');
    markerLine.setAttribute('fill', color);
    svg.appendChild(markerLine);
  }

}
