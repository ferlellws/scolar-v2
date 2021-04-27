import { JSONParser } from '@amcharts/amcharts4/core';
import { Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
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

  dataGraph: any = [];
  minRadius: number = 20;
  maxRadius: number = 50;
  distance: number = 3;

  vicepresidencies: VicePresidency[] = [];
  general_top: any;

  constructor(
    private mainService: MainService,
    private interrelationsService:InterrelationsService,
    private projectsService:ProjectsService,
    private vicePresidenciesService:VicePresidenciesService,
    private route: ActivatedRoute,
    private ngZone: NgZone
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
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    this.vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe(res => {
        environment.consoleMessage(res, "Viceeee");
        this.vicepresidencies = res;
      });

    this.interrelationsService.getGeneralTop()
      .subscribe(res => {
        this.general_top = res.general_top
      });
    
  }

  click(data: string) {
    environment.consoleMessage(data, "Data");
    environment.consoleMessage(data.split(' ')[0], "Id");
    this.clickProjectId = Number(data.split(' ')[0]);

    this.projectsService.getProjectsId(this.clickProjectId)
      .subscribe(data => {
        this.project = data;
        environment.consoleMessage(this.project,"Proyecto");

        this.interrelationsService.getInterrelationsCard(this.clickProjectId)
          .subscribe(data => {
            this.interrelations = data.interrelations;
            environment.consoleMessage(this.interrelations,"Interrelaciones");
            
            this.interrelationsService.getInterrelationsGraph()      
              .subscribe(res => {
                environment.consoleMessage(res.h_general_info,"RES Graph")
                
                this.interrelationsService.getInterrelationsGraphByProject(this.clickProjectId)
                  .subscribe(res => {
                    environment.consoleMessage(res, "Nueva info");
                    this.ngZone.run( () => {
                      environment.consoleMessage(res, "Nueva Infoooooooooooooo");
                      this.dataGraph = JSON.parse(JSON.stringify(res.h_general_info));
                      this.minRadius = 60;
                      this.maxRadius = 90;
                      this.distance = 1.5;
                      this.flag = "1";
                    });
                  });
              });
          });
      });
    }
}