import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-applications-by-project',
  templateUrl: './applications-by-project.component.html',
  styleUrls: ['./applications-by-project.component.scss']
})
export class ApplicationsByProjectComponent implements OnInit {

  applicationsForm = new FormControl();
  applications: Application[] = [];
  @Input() applicationsSelected : Application[] = [];

  @Output() emitChange: EventEmitter<Application[]> = new EventEmitter();

  constructor(
    private _applicationsService: ApplicationsService,
  ) { }

  async ngOnInit() {
    await this._applicationsService.getApplicationsSelect()
    .subscribe(applications => this.applications = applications);
    var selectedIDs: number[] = this.applicationsSelected.map(app => app.id!);
    // environment.consoleMessage(selectedIDs, "selectedIDs")
    this.applicationsForm.setValue(selectedIDs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applicationsSelected = changes.applicationsSelected.currentValue;
    var selectedIDs: number[] = this.applicationsSelected.map(app => app.id!);
    // environment.consoleMessage(selectedIDs, "selectedIDs")
    this.applicationsForm.setValue(selectedIDs);
  }

  onChangeSelect(){
    var selectedIDs: number [] = this.applicationsForm.value;
    this.applicationsSelected = this.applications.filter(application => 
      {
        var appID: number = -1;
        if(application.id != null){
          appID = application.id;
        }
        return selectedIDs.includes(appID);

      });
    this.emitChange.emit(this.applicationsSelected)
  } 

  remove(id: number | undefined){
    this.applicationsSelected = this.applicationsSelected.filter(application => application.id != id);
    var selectedIDs: number [] = this.applicationsForm.value;
    this.applicationsForm.setValue( selectedIDs.filter( selectedID => selectedID != id));
    this.emitChange.emit(this.applicationsSelected)
  }

}
