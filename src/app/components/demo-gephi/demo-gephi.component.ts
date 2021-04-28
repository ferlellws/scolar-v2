import { JSONParser } from '@amcharts/amcharts4/core';
import { Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { Interrelation } from 'src/app/models/interrelation';
import { Project } from 'src/app/models/project';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { MainService } from 'src/app/services/main.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';
import { environment } from 'src/environments/environment';
// import * as go from 'gojs'

@Component({
  selector: 'tecno-demo-gephi',
  templateUrl: './demo-gephi.component.html',
  styleUrls: ['./demo-gephi.component.scss']
})
export class DemoGephiComponent implements OnInit {

  clickProjectId!: number;
  interrelations!: any;
  project!: Project;
  labelAssignment = "Sin asignar";
  labelTotalInterrelation = "No hay relaciones";
  userID: any;
  profileID: any;
  actions!: Actions;
  flag: string = "0";

  dataGraph: any[] = [];
  minRadius: number = 20;
  maxRadius: number = 50;
  distance: number = 3;

  vicepresidencies: VicePresidency[] = [];
  general_top: any;
  graphByResources: any[] = [];
  graphByCompanies: any[] = [];
  graphByParticipatingAreas: any[] = [];
  graphByBelongsAreas: any[] = [];
  graphByApps: any[] = [];
  graphByProcessDefinition: any[] = [];
  graphByVariatonDefinition: any[] = [];


  constructor(
    private mainService: MainService,
    private interrelationsService:InterrelationsService,
    private projectsService:ProjectsService,
    private vicePresidenciesService:VicePresidenciesService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private fg: FormBuilder 
    ) {}

  ngOnInit(): void {
    this.flag = "0";
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.userID = JSON.parse(localStorage.user).id;
    this.profileID = JSON.parse(localStorage.user).profile_id;
    
    this.mainService.showLoading();

    this.route.data.subscribe((data: any) => {
      this.dataGraph = data.interrelationsInitial.h_general_info;
      this.general_top = data.generalTop.general_top;
      this.vicepresidencies = data.vicePresidency;

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
      });
    }

  click(data: string) {
    this.clickProjectId = Number(data.split(' ')[0]);
    this.projectsService.getProjectsId(this.clickProjectId)
      .subscribe(data => {
        this.project = data;
        this.interrelationsService.getInterrelationsCard(this.clickProjectId)
          .subscribe(data => {
            this.interrelations = data.interrelations;
            this.interrelationsService.getInterrelationsGraphByProject(this.clickProjectId)
              .subscribe(res => {
                this.ngZone.run( () => {
                  this.dataGraph = res.h_general_info;
                  this.minRadius = 60;
                  this.maxRadius = 90;
                  this.distance = 1.5;
                  this.flag = "1";
                });
              });
          });
      });
  }

  onClickViewAll() {
    environment.consoleMessage("Ver Todo");
    this.interrelationsService.getInterrelationsGraph()
      .subscribe(data => {
        this.dataGraph = data.h_general_info;
        this.minRadius = 20;
        this.maxRadius = 50;
        this.distance = 3;
        this.flag = "0";
      });
  }

  onClickResources() {
    if(this.graphByResources.length == 0) {
      this.interrelationsService.getGraphByResources()
        .subscribe(data => {
          this.graphByResources = data.h_general_info;
          this.dataGraph = this.graphByResources;
        });
    }
    this.dataGraph = this.graphByResources;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";    
  }

  onClickCompanies() {
    if(this.graphByCompanies.length == 0) {
      this.interrelationsService.getGraphByCompanies()
        .subscribe(data => {
          this.graphByCompanies = data.h_general_info;
          this.dataGraph = this.graphByCompanies;
        });
    }
    this.dataGraph = this.graphByCompanies;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";
  }

  onClickAreasParticipating() {
    if(this.graphByParticipatingAreas.length == 0) {
      this.interrelationsService.getGraphByParticpatingAreas()
        .subscribe(data => {
          this.graphByParticipatingAreas = data.h_general_info;
          this.dataGraph = this.graphByParticipatingAreas;
        });
    }
    this.dataGraph = this.graphByParticipatingAreas;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";
  }

  onClickAreasBelongs() {
    environment.consoleMessage("Áreas Pertenecientes");
    if(this.graphByBelongsAreas.length == 0) {
      this.interrelationsService.getGraphByBelongsAreas()
        .subscribe(data => {
          this.graphByBelongsAreas = data.h_general_info;
          this.dataGraph = this.graphByBelongsAreas;
        });
    }
    this.dataGraph = this.graphByBelongsAreas;
    this.minRadius = 25;
    this.maxRadius = 50;
    this.distance = 3;
    this.flag = "0";
  }

  onClickApps() {
    environment.consoleMessage("Aplicaciones Impactadas");
    if(this.graphByApps.length == 0) {
      this.interrelationsService.getGraphByParticpatingAreas()
        .subscribe(data => {
          this.graphByApps = data.h_general_info;
          this.dataGraph = this.graphByApps;
        });
    }
    this.dataGraph = this.graphByApps;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";
  }

  onClickDefinitionProcess() {
    environment.consoleMessage("Definición de Recursos");
    if(this.graphByProcessDefinition.length == 0) {
      this.interrelationsService.getGraphByProcessDefinition()
        .subscribe(data => {
          this.graphByProcessDefinition = data.h_general_info;
          this.dataGraph = this.graphByProcessDefinition;
        });
    }
    this.dataGraph = this.graphByProcessDefinition;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";
  }

  onClickVariationProcess() {
    environment.consoleMessage("Variación Alcance de Proceso");
    if(this.graphByVariatonDefinition.length == 0) {
      this.interrelationsService.getGraphByVariationDefinition()
        .subscribe(data => {
          this.graphByVariatonDefinition = data.h_general_info;
          this.dataGraph = this.graphByVariatonDefinition;
        });
    }
    this.dataGraph = this.graphByVariatonDefinition;
    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 3;
    this.flag = "0";
  }

  onClickZoomMas() {
    this.minRadius = this.minRadius + 5;      
    this.maxRadius = this.maxRadius + 5;
  }

  onClickZoomMenos() {
    this.minRadius = this.minRadius - 5;
    this.maxRadius = this.maxRadius - 5;
  }
}

