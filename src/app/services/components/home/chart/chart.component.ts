import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: any[];
  @Input() colorScheme: any[];

  barSelected: boolean = true;
  constructor() { }

  

  ngOnInit(): void {
    console.log(this.colorScheme);
    
  }

  barButton(){
    this.barSelected = true;
  }

  pieButton(){
    this.barSelected = false;
  }

}
