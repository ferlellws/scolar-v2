import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-projects-by-vicepresidency',
  templateUrl: './projects-by-vicepresidency.component.html',
  styleUrls: ['./projects-by-vicepresidency.component.scss']
})
export class ProjectsByVicepresidencyComponent implements OnInit {

  data: any;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.data = data.projects;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }

  onProject(id: number){
    this.router.navigate([`/project-details/${id}`]);
    true;//environment.consoleMessage(id, "project");
  }

}
