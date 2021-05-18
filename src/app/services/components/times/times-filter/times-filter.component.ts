import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconsService } from 'src/app/services/icons.service';
import { ItemTypeService } from 'src/app/services/item-type.service';
import { ItemsService } from 'src/app/services/items.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { TimesFilterService } from 'src/app/services/times-filter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tecno-times-filter',
  templateUrl: './times-filter.component.html',
  styleUrls: ['./times-filter.component.scss']
})
export class TimesFilterComponent implements OnInit {

  users: any[];
  items: any[];
  projects: any[];
  timeTypes: any[];
  icons: any[];

  usersCSelected: number[] = [];
  usersMSelected: number[] = [];
  projectsSelected: number[] = [];
  timeTypesSelected: number[] = [];
  itemsSelected: number[] = [];

  dates: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(
    private _usersService: UserService,
    private _itemsService: ItemsService,
    private _projectsService: ProjectsService,
    private _timeTypesService: TimeTypesService,
    private _iconsService: IconsService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private _timesFilterService: TimesFilterService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.icons = data.icons;
      }
    );
    // this._iconsService.getIcons().
    //   subscribe(icons=> this.icons = icons);
    this._usersService.getUsers().
      subscribe(users => this.users = users);
    this._itemsService.getItems().
      subscribe(items => this.items = items);
    this._projectsService.getProjects().
      subscribe(projects => this.projects = projects);
    this._timeTypesService.getTimeTypes().
      subscribe(timeTypes => this.timeTypes = timeTypes);

    this.dates = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'startDate': [],
      'endDate':[],
    });

    this.filtrar();

  }

  clickUserC(id: number){
    if(!this.usersCSelected.includes(id)){
      this.usersCSelected.push(id);
    }else{
      this.usersCSelected= this.usersCSelected.filter(user => user != id);
    }
  }

  clickUserM(id: number){
    if(!this.usersMSelected.includes(id)){
      this.usersMSelected.push(id);
    }else{
      this.usersMSelected= this.usersMSelected.filter(user => user != id);
    }
  }

  clickProject(id: number){
    if(!this.projectsSelected.includes(id)){
      this.projectsSelected.push(id);
    }else{
      this.projectsSelected= this.projectsSelected.filter(project => project != id);
    }
  }

  clickItem(id: number){
    if(!this.itemsSelected.includes(id)){
      this.itemsSelected.push(id);
    }else{
      this.itemsSelected= this.itemsSelected.filter(item => item != id);
    }
  }

  clickTimeType(id: number){
    if(!this.timeTypesSelected.includes(id)){
      this.timeTypesSelected.push(id);
    }else{
      this.timeTypesSelected= this.timeTypesSelected.filter(itemType => itemType != id);
    }
  }

  parseDate(date): string {

    if (date + "" != "Invalid Date" && date !=null){
      let d: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return this.datepipe.transform(d, 'yyyy-MM-dd');
      }
    }else{
      return null;
    }
  }

  getIcon(id: number){
    return this.icons.filter(icon => icon.id == id)[0].title;
  }

  filtrar(){
      var params: any = {
      sysuser_id: sessionStorage.id,
      format: 'json',
    }
    if(this.usersCSelected.length > 0){
      params.user_creates_id = this.usersCSelected[0];
    }
    if(this.usersMSelected.length > 0){
      params.user_updates_id = this.usersMSelected[0];
    }
    if(this.usersMSelected.length > 0){
      params.user_updates_id = this.usersMSelected[0];
    }
    if(this.projectsSelected.length > 0){
      params.project_id = this.projectsSelected[0];
    }
    if(this.itemsSelected.length > 0){
      params.item_id = this.itemsSelected[0];
    }
    if(this.timeTypesSelected.length > 0){
      params.time_type_id = this.timeTypesSelected[0];
    }
    var startDate  = this.parseDate(this.dates.get('startDate').value);
    if(startDate != null){
      params.date_from = startDate;
    }
    var endDate  = this.parseDate(this.dates.get('endDate').value);
    if(endDate != null){
      params.date_until = endDate;
    }
    this._timesFilterService.getFilteredTimes(params);
  }

}
