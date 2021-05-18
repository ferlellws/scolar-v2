import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-quality-graph',
  templateUrl: './quality-graph.component.html',
  styleUrls: ['./quality-graph.component.scss']
})

export class QualityGraphComponent implements OnInit {

  @Input() multi_chart: any[];
  view: any[];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    chart1: {
      domain: ['#2196f3', '#f44336', '#ffc107', '#4caf50']
    }
  };

  ngOnInit(): void {
  }

  constructor() {  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
