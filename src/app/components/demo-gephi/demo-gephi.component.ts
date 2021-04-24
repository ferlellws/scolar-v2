import { Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { Interrelation } from 'src/app/models/interrelation';
import { Project } from 'src/app/models/project';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { ProjectsService } from 'src/app/services/projects.service';
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

  constructor(
    private interrelationsService:InterrelationsService,
    private projectsService:ProjectsService,
    private route: ActivatedRoute,
    private ngZone: NgZone
    ) {}

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.userID = JSON.parse(localStorage.user).id;
    this.profileID = JSON.parse(localStorage.user).profile_id;
    this.flag = "0";
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
            this.ngZone.run( () => {
              this.flag = "1";
           });
          });
      });
    
    environment.consoleMessage(this.flag,"Flag");
  }
}
