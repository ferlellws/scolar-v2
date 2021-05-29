import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Project } from 'src/app/models/project';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})

export class ProjectsDashboardComponent implements OnInit {

  @Input() dashboard!:any[] ;
  colors: string[] =[
    "#673AB7",
    "#F44336",
    "#03A9F4",
    "#4CAF50",
    "#FF5722",
  ] 


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onVicepresindency(id: number) {
    this.router.navigate([`/projects-by-vicepresidency/${id}`]);
  }

  onProject(id: number) {
    this.router.navigate([`/project-details/${id}`]);
  }

}
