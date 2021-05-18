import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconsService } from 'src/app/services/icons.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemHistoriesFilterService } from 'src/app/services/items/item-histories-filter.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { TimesFilterService } from 'src/app/services/times-filter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tecno-statuses-filter',
  templateUrl: './statuses-filter.component.html',
  styleUrls: ['./statuses-filter.component.scss']
})
export class StatusesFilterComponent implements OnInit {

  items: any[];
  projects: any[];
  icons: any[];
  users: any[];
  
  projectsSelected: number[] = [];
  itemsSelected: number[] = [];
  usersMSelected: number[] = [];

  dates: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(
    private _itemsService: ItemsService,
    private _projectsService: ProjectsService,
    private _iconsService: IconsService,
    private _usersService: UserService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private _itemHistoriesFilterService: ItemHistoriesFilterService,

  ) { }

  ngOnInit(): void {

    this._usersService.getUsers().
      subscribe(users => this.users = users);
    this._iconsService.getIcons().
      subscribe(icons=> this.icons = icons);
    this._itemsService.getItems().
      subscribe(items => this.items = items);
    this._projectsService.getProjects().
      subscribe(projects => this.projects = projects);

    this.dates = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'startDate': [],
      'endDate':[],
    });

    this.filtrar();

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

  clickUserM(id: number){
    if(!this.usersMSelected.includes(id)){
      this.usersMSelected.push(id);
    }else{
      this.usersMSelected= this.usersMSelected.filter(user => user != id);
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
    if(this.projectsSelected.length > 0){
      params.project_id = this.projectsSelected[0];
    }
    if(this.itemsSelected.length > 0){
      params.item_id = this.itemsSelected[0];
    }
    var startDate  = this.parseDate(this.dates.get('startDate').value);
    if(startDate != null){
      params.date_from = startDate;
    }
    var endDate  = this.parseDate(this.dates.get('endDate').value);
    if(endDate != null){
      params.date_until = endDate;
    }
    if(this.usersMSelected.length > 0){
      params.user_updates_id = this.usersMSelected[0];
    }
    this._itemHistoriesFilterService.getFilteredStatus(params);
  }

}
