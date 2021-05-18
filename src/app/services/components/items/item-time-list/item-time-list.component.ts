import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ItemTime } from 'src/app/models/item-time';
import { TimeType } from 'src/app/models/time-type';
import { User } from 'src/app/models/user';
import { ItemTimesService } from 'src/app/services/items/item-times.service';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tecno-item-time-list',
  templateUrl: './item-time-list.component.html',
  styleUrls: ['./item-time-list.component.scss']
})
export class ItemTimeListComponent implements OnInit {
  

  itemTimes: ItemTime[] = [];
  users: User[] = [];
  timeTypes: TimeType[] = [];
  role = parseInt(sessionStorage.sysrole_id);
  id = parseInt(sessionStorage.id);

  @Input() item: any;
  @Input() lead_id: number;
  @Input() isMultipleResource:boolean;

  flagCrear: boolean = false;
  flagEditar: boolean = false;
  itemTime: ItemTime;

  constructor(
    private _itemTimesService: ItemTimesService,
    private _usersService: UserService,
    private _timeTypesService: TimeTypesService,
  ) { }

  ngOnInit(): void {

    this.fillItemTimes();

    this._timeTypesService.getTimeTypes()
      .subscribe(timeTypes => this.timeTypes = timeTypes);

    this._usersService.getUsers()
      .subscribe(users => this.users = users);

    this._itemTimesService.emitAddItemTime
      .subscribe(data => {
        
        if(data.item_id == this.item.id){
          this.itemTimes.push(data);
        }
      });

      this._itemTimesService.emitEditItemTime
        .subscribe(data =>{
          this.fillItemTimes();
        });
    
      this._itemTimesService.emitDeleteItemTime
      .subscribe(data => {
          this.fillItemTimes();
      });

  }

  

  onEmitFlagCrearTime(flagCrear) {
    this.flagCrear = flagCrear;
    this.flagEditar = false;
  }

  getNameUser(id){
    const t = this.users.filter(user => user.id == id)[0];
    if(t!=null){
      return `${t.firstname} ${t.lastname}`;
    }
  }

  getNameType(id){
    const t = this.timeTypes.filter(timeType => timeType.id == id)[0];
    if(t!=null){
      return `${t.title}`;
    }
  }

  delete(id){
    this._itemTimesService.deleteTime(id);
  }

  cerrar(){
    this.flagCrear = false;
  }

  edit(itemTime){
    if(!this.flagCrear){
      this.itemTime = itemTime;
      this.flagEditar = true;
      this.flagCrear = true;
    }else{
      this.flagCrear = false;
    }
  }

  fillItemTimes(){
    if(this.role == 1 
    || parseInt(this.item.reported_by_id) == this.id){
      this._itemTimesService.getTimesByItem(this.item.id)
        .subscribe(itemTimes => this.itemTimes = itemTimes);
    }else{
      this._itemTimesService.getTimesByItemUser(this.item.id, this.id)
        .subscribe(itemTimes => this.itemTimes = itemTimes);
    }
    
  }

}
