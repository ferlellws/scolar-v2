import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      data.project.balance = new Intl.NumberFormat('en-US').format( data.project.budget_approved  - data.project.budget_executed );
      data.project.budget_executed = new Intl.NumberFormat('en-US').format( data.project.budget_executed);
      data.project.budget_approved = new Intl.NumberFormat('en-US').format( data.project.budget_approved);
      this.project = data.project;
      console.log(this.project);
      
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

  }

  onValorem(){
    environment.consoleMessage("onValorem");
  }

  onWeek(){
    environment.consoleMessage("onWeek");
  }

}
