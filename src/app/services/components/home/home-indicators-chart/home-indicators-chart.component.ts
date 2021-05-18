import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectIndicator } from 'src/app/models/project-indicator';

@Component({
  selector: 'tecno-home-indicators-chart',
  templateUrl: './home-indicators-chart.component.html',
  styleUrls: ['./home-indicators-chart.component.scss']
})
export class HomeIndicatorsChartComponent implements OnInit {

  // @Input() bgColor: string;
  @Input() projectIndicator: ProjectIndicator;
  @Input() indicatorsProjects: any;
  @Input() chartData: any;
  @Input() colorScheme: any;
  @Input() developerCompanyId: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("-------=============projectIndicator: ", this.projectIndicator);
    console.log("-------=============indicatorsProjects: ", this.indicatorsProjects);
    console.log("-------=============developerCompanyId: ", this.developerCompanyId);
  }

  onClick(id: number, mode: number, developerCompanyId: number) {
    console.log(">>>>>>>>>>projectId: ", id);
    console.log(">>>>>>>>>>mode: ", mode);
    console.log("-------=============developerCompanyId: ", developerCompanyId);


    let arrayLink = [];

    if (mode == -1) {
      arrayLink = ['/items', id, 0];
    } else {
      arrayLink = ['/items', id, mode];
    }

    if (developerCompanyId != 0) {
      arrayLink.push(developerCompanyId);
    }

    console.log(arrayLink);
    this.router.navigate(arrayLink);
  }

}
