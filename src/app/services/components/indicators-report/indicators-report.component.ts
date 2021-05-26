import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tecno-indicators-report',
  templateUrl: './indicators-report.component.html',
  styleUrls: ['./indicators-report.component.scss']
})
export class IndicatorsReportComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  // myData: any[];
  // title: string;
  // type: string;
  // data: (string | number)[][];
  // columnNames: string[];
  // options: {};
  // width: number;
  // height: number;

  flagProgressBar: boolean = true;

  generalDevelopersIndicators: any;
  generalIndicatorsHoursDevelopers: any;
  generalIndicatorsReturns: any;
  developers: any[];

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.generalDevelopersIndicators = data.generalDevelopersIndicators.generalDevelopersIndicators;
      this.generalIndicatorsHoursDevelopers = data.generalIndicatorsHoursDevelopers.generalIndicatorsHoursDevelopers;
      this.generalIndicatorsReturns = data.generalIndicatorsReturns.generalIndicatorsHoursDevelopers;
      this.developers = data.developers;
      console.log("developoers", this.developers);
      
      this.flagProgressBar = false;
    })
  }

}
