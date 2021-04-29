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
  distance: number = 4;

  vicepresidencies: any[] = [];
  general_top: any;
  graphByResources: any[] = [];
  graphByCompanies: any[] = [];
  graphByParticipatingAreas: any[] = [];
  graphByBelongsAreas: any[] = [];
  graphByApps: any[] = [];
  graphByProcessDefinition: any[] = [];
  graphByVariatonDefinition: any[] = [];

  colorVerTodo: string = "primary";
  colorRecursos: string = "";
  colorProveedores: string = "";
  colorAreasParticipantes: string = "";
  colorAreasPertenecientes: string = "";
  colorApps: string = "";
  colorDefProcesos: string = "";
  colorVarProcesos: string = "";
  bttnVp1: string = ""
  textVp1: string = ""
  bttnVp2: string = ""
  textVp2: string = ""
  bttnVp3: string = ""
  textVp3: string = ""
  bttnVp4: string = ""
  textVp4: string = ""
  project_total: number = 0;
  viceID: any = null;
  labels: boolean = false;

  constructor(
    private mainService: MainService,
    private interrelationsService:InterrelationsService,
    private projectsService:ProjectsService,
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
      this.project_total = this.dataGraph.length;
      this.general_top = data.generalTop.general_top;
      this.vicepresidencies = data.vicePresidency.vice_info;

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
      });
    }

  click(data: string) {
    this.colorVerTodo = "";
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";
    this.bttnVp4 = ""
    this.textVp4 = ""
    this.bttnVp2 = ""
    this.textVp2 = ""
    this.bttnVp3 = ""
    this.textVp3 = ""
    this.bttnVp1 = ""
    this.textVp1 = ""
    this.viceID = null;

    this.clickProjectId = Number(data.split(' ')[0]);
    this.projectsService.getProjectsId(this.clickProjectId)
      .subscribe(data => {
        this.project = data;
        this.interrelationsService.getInterrelationsCard(this.clickProjectId, 1)
          .subscribe(data => {
            this.interrelations = data.interrelations;
            this.interrelationsService.getInterrelationsGraphByProject(this.clickProjectId)
              .subscribe(res => {
                this.ngZone.run( () => {
                  this.dataGraph = res.h_general_info;
                  this.minRadius = 30;
                  this.maxRadius = 70;
                  this.distance = 1.5;
                  this.flag = "1";
                });
              });
          });
      });
  }

  onClickViewAll() {
    this.colorVerTodo = "primary"
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";
    this.bttnVp1 = ""
    this.textVp1 = ""
    this.bttnVp2 = ""
    this.textVp2 = ""
    this.bttnVp3 = ""
    this.textVp3 = ""
    this.bttnVp4 = ""
    this.textVp4 = ""
    this.viceID = null;

    this.interrelationsService.getInterrelationsGraph()
      .subscribe(data => {
        this.dataGraph = data.h_general_info;
        this.minRadius = 20;
        this.maxRadius = 50;
        this.distance = 4;
        this.flag = "0";
      });
  }

  onClickResources() {
    this.colorRecursos = "accent"
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";

    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByResources(idProject)
        .subscribe(data => {
          this.graphByResources = data.h_general_info;
          this.dataGraph = this.graphByResources;
        });
      
      this.dataGraph = this.graphByResources;
    } else {
      this.interrelationsService.getGraphVicepresidencyByResources(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickCompanies() {
    this.colorProveedores = "accent"
    this.colorRecursos = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";

    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByCompanies(idProject)
        .subscribe(data => {
          this.graphByCompanies = data.h_general_info;
          this.dataGraph = this.graphByCompanies;
        });

        this.dataGraph = this.graphByCompanies;
    } else {
      this.interrelationsService.getGraphVicepresidencyByCompanies(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickAreasParticipating() {
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "accent";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";

    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }
    
    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByParticpatingAreas(idProject)
        .subscribe(data => {
          this.graphByParticipatingAreas = data.h_general_info;
          this.dataGraph = this.graphByParticipatingAreas;
        });

      this.dataGraph = this.graphByParticipatingAreas;
    } else {
      this.interrelationsService.getGraphVicepresidencyByAreasParticipating(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickAreasBelongs() {
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "accent";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";

    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByBelongsAreas(idProject)
        .subscribe(data => {
          this.graphByBelongsAreas = data.h_general_info;
          this.dataGraph = this.graphByBelongsAreas;
        });
      this.dataGraph = this.graphByBelongsAreas;
    } else {
      this.interrelationsService.getGraphVicepresidencyByAreasBelongs(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });
    }

    this.minRadius = 25;
    this.maxRadius = 50;
    this.distance = 4;
  }

  onClickApps() {
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "accent";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";
   
    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByApps(idProject)
        .subscribe(data => {
          this.graphByApps = data.h_general_info;
          this.dataGraph = this.graphByApps;
        });
      this.dataGraph = this.graphByApps;
    } else {
      this.interrelationsService.getGraphVicepresidencyByApps(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickDefinitionProcess() {
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "accent";
    this.colorVarProcesos = "";
   
    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphByProcessDefinition(idProject)
        .subscribe(data => {
          this.graphByProcessDefinition = data.h_general_info;
          this.dataGraph = this.graphByProcessDefinition;
        });
      this.dataGraph = this.graphByProcessDefinition;
    } else {
      this.interrelationsService.getGraphVicepresidencyByDefinitionProcess(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.h_general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickVariationProcess() {
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "accent";

    let idProject = "null";
    if(this.flag == '1') {
      idProject = this.clickProjectId.toString();
    }

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""
      this.interrelationsService.getGraphByVariationDefinition(idProject)
        .subscribe(data => {
          this.graphByVariatonDefinition = data.h_general_info;
          this.dataGraph = this.graphByVariatonDefinition;
        });
      this.dataGraph = this.graphByVariatonDefinition;
    } else {
      this.interrelationsService.getGraphVicepresidencyByVariationProcess(this.viceID)
        .subscribe(data => {
          this.dataGraph = data.h_general_info;
        });
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickZoomMas() {
    this.minRadius = this.minRadius + 5;      
    this.maxRadius = this.maxRadius + 5;
  }

  onClickZoomMenos() {
    this.minRadius = this.minRadius - 5;
    this.maxRadius = this.maxRadius - 5;
  }


  clickVicepresidency(id: number) {
    this.viceID = id;
    this.ngZone.run( () => {
      this.flag = "0";
    });
    this.colorRecursos = "";
    this.colorProveedores = "";
    this.colorAreasParticipantes = "";
    this.colorAreasPertenecientes = "";
    this.colorApps = "";
    this.colorDefProcesos = "";
    this.colorVarProcesos = "";
    this.colorVerTodo = "";

    environment.consoleMessage(id, "ID VICE")
    if(id == this.vicepresidencies[0].id) {
      this.bttnVp1 = "#ff4081"
      this.textVp1 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphVicepresidency(id)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });

    } else if(id == this.vicepresidencies[1].id) {
      this.bttnVp2 = "#ff4081"
      this.textVp2 = "white"
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphVicepresidency(id)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });

    } else if(id == this.vicepresidencies[2].id) {
      this.bttnVp3 = "#ff4081"
      this.textVp3 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

      this.interrelationsService.getGraphVicepresidency(id)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });

    } else if(id == this.vicepresidencies[3].id) {
      this.bttnVp4 = "#ff4081"
      this.textVp4 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp1 = ""
      this.textVp1 = ""

      this.interrelationsService.getGraphVicepresidency(id)
        .subscribe(data => {
          this.dataGraph = data.general_info;
        });

    }
    
  }

  onClickLeyenda(){
    this.labels = !this.labels;
  }
}

