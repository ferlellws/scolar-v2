import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {
  actions!: Actions;
  
  constructor() {}

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
  }

}
