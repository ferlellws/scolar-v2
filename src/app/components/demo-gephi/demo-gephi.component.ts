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

  colorVerTodo: string = "";
  colorRecursos: string = "primary";
  colorProveedores: string = "primary";
  colorAreasParticipantes: string = "primary";
  colorAreasPertenecientes: string = "primary";
  colorApps: string = "primary";
  colorDefProcesos: string = "primary";
  colorVarProcesos: string = "primary";
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

  flagResource: boolean = true;
  flagCompanies: boolean = true;
  flagAreasParticipating: boolean = true;
  flagAreasBelongs: boolean = true;
  flagApps: boolean = true;
  flagDefProcess: boolean = true;
  flagVarProcess: boolean = true;

  initialClick: boolean = true;

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

    this.selectAllFiltersButtons();
    this.initialClick = true;

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
            this.interrelationsService.getInterrelationsGraph(
              this.flagResource,
              this.flagCompanies,
              this.flagAreasParticipating,
              this.flagAreasBelongs,
              this.flagApps,
              this.flagDefProcess,
              this.flagVarProcess,
              this.clickProjectId,
              null
              )
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

  clearFiltersButtons() {
    this.flagResource = false;
    this.flagCompanies = false;
    this.flagAreasParticipating = false;
    this.flagAreasBelongs = false;
    this.flagApps = false;
    this.flagDefProcess = false;
    this.flagVarProcess = false;
  }

  selectAllFiltersButtons() {
    this.flagResource = true;
    this.flagCompanies = true;
    this.flagAreasParticipating = true;
    this.flagAreasBelongs = true;
    this.flagApps = true;
    this.flagDefProcess = true;
    this.flagVarProcess = true;
  }

  clearVicesBttns() {
    this.bttnVp1 = "";
    this.textVp1 = "";
    this.bttnVp2 = "";
    this.textVp2 = "";
    this.bttnVp3 = "";
    this.textVp3 = "";
    this.bttnVp4 = "";
    this.textVp4 = "";
  }

  onClickClearAll() {
    this.clearFiltersButtons();
    this.initialClick = true;
    this.clearVicesBttns();
    
    this.interrelationsService.getInterrelationsGraph(
      this.flagResource,
      this.flagCompanies,
      this.flagAreasParticipating,
      this.flagAreasBelongs,
      this.flagApps,
      this.flagDefProcess,
      this.flagVarProcess,
      null,
      null
      )
      .subscribe(data => {
        this.graphByResources = data.h_general_info;
        this.dataGraph = this.graphByResources;
      });
  }

  onClickViewAll() {
    this.selectAllFiltersButtons();
    this.initialClick = true;

    this.clearVicesBttns();
    this.viceID = null;

    this.interrelationsService.getInterrelationsGraph(
      this.flagResource,
      this.flagCompanies,
      this.flagAreasParticipating,
      this.flagAreasBelongs,
      this.flagApps,
      this.flagDefProcess,
      this.flagVarProcess,
      null,
      null
      )
      .subscribe(data => {
        this.dataGraph = data.h_general_info;
        this.minRadius = 20;
        this.maxRadius = 50;
        this.distance = 4;
        this.flag = "0";
      });
  }

  onClickResources() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }

    this.flagResource = !this.flagResource;

    if(this.viceID == null) {
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""
      
      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
        
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          idProject,
          null
          )
            .subscribe(data => {
              this.graphByResources = data.h_general_info;
              this.dataGraph = this.graphByResources;
            });
          
          this.dataGraph = this.graphByResources;
      } else {
        //this.interrelationsService.getGraphByResources(idProject)
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          null,
          null
          )
            .subscribe(data => {
              this.graphByResources = data.h_general_info;
              this.dataGraph = this.graphByResources;
            });
          
          this.dataGraph = this.graphByResources;
      }
      
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickCompanies() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }

    this.flagCompanies = !this.flagCompanies;

    if(this.viceID == null) {
      this.clearVicesBttns();

      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
        //this.interrelationsService.getGraphByCompanies(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByCompanies = data.h_general_info;
            this.dataGraph = this.graphByCompanies;
          });
          this.dataGraph = this.graphByCompanies;
        } else {
          this.interrelationsService.getInterrelationsGraph(
            this.flagResource,
            this.flagCompanies,
            this.flagAreasParticipating,
            this.flagAreasBelongs,
            this.flagApps,
            this.flagDefProcess,
            this.flagVarProcess,
            null,
            null
            )
              .subscribe(data => {
                this.graphByCompanies = data.h_general_info;
                this.dataGraph = this.graphByCompanies;
              });
              this.dataGraph = this.graphByCompanies;
        }
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickAreasParticipating() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }
    
    this.flagAreasParticipating = !this.flagAreasParticipating;
   
    if(this.viceID == null) {
      this.clearVicesBttns();

      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
      
        //this.interrelationsService.getGraphByParticpatingAreas(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByParticipatingAreas = data.h_general_info;
            this.dataGraph = this.graphByParticipatingAreas;
          });
        this.dataGraph = this.graphByParticipatingAreas;
      } else {
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          null,
          null
          )
            .subscribe(data => {
              this.graphByParticipatingAreas = data.h_general_info;
              this.dataGraph = this.graphByParticipatingAreas;
            });
          this.dataGraph = this.graphByParticipatingAreas;
      }
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickAreasBelongs() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }
    
    this.flagAreasBelongs = !this.flagAreasBelongs;
    
    if(this.viceID == null) {
      this.clearVicesBttns();

      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
      
        //this.interrelationsService.getGraphByBelongsAreas(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByBelongsAreas = data.h_general_info;
            this.dataGraph = this.graphByBelongsAreas;
          });
        this.dataGraph = this.graphByBelongsAreas;
        } else {
          this.interrelationsService.getInterrelationsGraph(
            this.flagResource,
            this.flagCompanies,
            this.flagAreasParticipating,
            this.flagAreasBelongs,
            this.flagApps,
            this.flagDefProcess,
            this.flagVarProcess,
            null,
            null
            )
              .subscribe(data => {
                this.graphByBelongsAreas = data.h_general_info;
                this.dataGraph = this.graphByBelongsAreas;
              });
            this.dataGraph = this.graphByBelongsAreas;
      }

    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 25;
    this.maxRadius = 50;
    this.distance = 4;
  }

  onClickApps() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }
    
    this.flagApps = !this.flagApps;

    if(this.viceID == null) {
      this.clearVicesBttns();

      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
      
        //this.interrelationsService.getGraphByApps(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByApps = data.h_general_info;
            this.dataGraph = this.graphByApps;
          });
        this.dataGraph = this.graphByApps;
      } else {
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          null,
          null
          )
            .subscribe(data => {
              this.graphByApps = data.h_general_info;
              this.dataGraph = this.graphByApps;
            });
          this.dataGraph = this.graphByApps;
      }
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickDefinitionProcess() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }
    
    this.flagDefProcess = !this.flagDefProcess;

    if(this.viceID == null) {
      this.clearVicesBttns();

      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
      
        //this.interrelationsService.getGraphByProcessDefinition(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByProcessDefinition = data.h_general_info;
            this.dataGraph = this.graphByProcessDefinition;
          });
        this.dataGraph = this.graphByProcessDefinition;
      } else {
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          null,
          null
          )
            .subscribe(data => {
              this.graphByProcessDefinition = data.h_general_info;
              this.dataGraph = this.graphByProcessDefinition;
            });
          this.dataGraph = this.graphByProcessDefinition;
      }
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
    }

    this.minRadius = 35;
    this.maxRadius = 60;
    this.distance = 4;
  }

  onClickVariationProcess() {
    if(this.initialClick) {
      this.clearFiltersButtons();
      this.initialClick = false;
    }

    this.flagVarProcess = !this.flagVarProcess;

    if(this.viceID == null) {
      this.clearVicesBttns();
      
      let idProject = "null";
      if(this.flag == '1') {
        idProject = this.clickProjectId.toString();
      
        //this.interrelationsService.getGraphByVariationDefinition(idProject)
        this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        idProject,
        null
        )
          .subscribe(data => {
            this.graphByVariatonDefinition = data.h_general_info;
            this.dataGraph = this.graphByVariatonDefinition;
          });
        this.dataGraph = this.graphByVariatonDefinition;
      } else {
        this.interrelationsService.getInterrelationsGraph(
          this.flagResource,
          this.flagCompanies,
          this.flagAreasParticipating,
          this.flagAreasBelongs,
          this.flagApps,
          this.flagDefProcess,
          this.flagVarProcess,
          null,
          null
          )
            .subscribe(data => {
              this.graphByVariatonDefinition = data.h_general_info;
              this.dataGraph = this.graphByVariatonDefinition;
            });
          this.dataGraph = this.graphByVariatonDefinition;
      }
    } else {
      this.interrelationsService.getInterrelationsGraph(
        this.flagResource,
        this.flagCompanies,
        this.flagAreasParticipating,
        this.flagAreasBelongs,
        this.flagApps,
        this.flagDefProcess,
        this.flagVarProcess,
        null,
        this.viceID
        )
          .subscribe(data => {
            this.graphByResources = data.h_general_info;
            this.dataGraph = this.graphByResources;
          });
        
        this.dataGraph = this.graphByResources;
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
    this.initialClick = true;
    this.viceID = id;
    this.ngZone.run( () => {
      this.flag = "0";
    });
    this.selectAllFiltersButtons();

    if(id == this.vicepresidencies[0].id) {
      this.bttnVp1 = "#ff4081"
      this.textVp1 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

    } else if(id == this.vicepresidencies[1].id) {
      this.bttnVp2 = "#ff4081"
      this.textVp2 = "white"
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""

    } else if(id == this.vicepresidencies[2].id) {
      this.bttnVp3 = "#ff4081"
      this.textVp3 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp1 = ""
      this.textVp1 = ""
      this.bttnVp4 = ""
      this.textVp4 = ""
      
    } else if(id == this.vicepresidencies[3].id) {
      this.bttnVp4 = "#ff4081"
      this.textVp4 = "white"
      this.bttnVp2 = ""
      this.textVp2 = ""
      this.bttnVp3 = ""
      this.textVp3 = ""
      this.bttnVp1 = ""
      this.textVp1 = ""
    }

    this.interrelationsService.getInterrelationsGraph(
      this.flagResource,
      this.flagCompanies,
      this.flagAreasParticipating,
      this.flagAreasBelongs,
      this.flagApps,
      this.flagDefProcess,
      this.flagVarProcess,
      null,
      id
      )
      .subscribe(data => {
        this.graphByResources = data.h_general_info;
        this.dataGraph = this.graphByResources;
      });
      this.dataGraph = this.graphByResources;
  }

  onClickLeyenda(){
    this.labels = !this.labels;
  }
}

