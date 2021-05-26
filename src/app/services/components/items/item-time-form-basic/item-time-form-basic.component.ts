import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemResource } from 'src/app/models/item-resource';
import { ItemTime } from 'src/app/models/item-time';
import { TimeType } from 'src/app/models/time-type';
import { User } from 'src/app/models/user';
import { ItemResourcesService } from 'src/app/services/items/item-resources.service';
import { ItemTimesService } from 'src/app/services/items/item-times.service';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tecno-item-time-form-basic',
  templateUrl: './item-time-form-basic.component.html',
  styleUrls: ['./item-time-form-basic.component.scss']
})
export class ItemTimeFormBasicComponent implements OnInit {

  newItemTime: any = {};
  users: User[] = [];
  usersFitered: User[] = [];
  timeTypes: TimeType[] = [];
  role = parseInt(sessionStorage.sysrole_id);
  id = parseInt(sessionStorage.id);
  message = '';
  validation = true;

  @Input() flagCrear: boolean;
  @Input() itemId: number;
  @Input() reported_by_id: number;
  @Input() lead_id: number;
  @Input() isMultipleResource: boolean;
  @Input() flagEditar: boolean;
  @Input() itemTime: ItemTime;
  @Output() emitFlagCrearTime = new EventEmitter<boolean>();

  basicTimeOptions: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  habilitado:boolean = false;
  defaultValues: any;

  constructor(
    private fb: FormBuilder, 
    private _itemTimesService: ItemTimesService,
    private _usersService: UserService,
    private _timeTypesService: TimeTypesService,
    private _itemResourcesService: ItemResourcesService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {

    if(this.flagEditar){
      this.defaultValues = {
        userControl: this.itemTime.user_creates_id,
        TimeTypeControl: this.itemTime.time_type_id,
        descriptionControl: this.itemTime.description,
        dateControl: new Date(this.itemTime.date_work + ':00:00'),
        hoursControl: this.itemTime.hours,
        minutesControl: this.itemTime.minutes
      }
    }else{
      this.defaultValues = {
        userControl: parseInt(sessionStorage.id),
        TimeTypeControl: null,
        descriptionControl: null,
        dateControl: new Date(),
        hoursControl: 8,
        minutesControl: 0
      }
    }

    this.habilitado = this.habilitar();

    this._usersService.getUsers()
      .subscribe(users => 
        {
          this.users = users;
          this._itemResourcesService.getResourcesByItem(this.itemId)
            .subscribe( (itemResources: ItemResource[]) =>
              {
                for (let index = 0; index < itemResources.length; index++) {
                  this.usersFitered.push(this.users.filter(user => user.id == itemResources[index].sysuser_id)[0]);
                }
                if(this.role == 1 || this.reported_by_id == this.id || this.id == this.lead_id){
                  
                }else{
                  this.usersFitered = this.usersFitered.filter(user => user.id == this.id);
                }
                
              }
            )
        });

    this._timeTypesService.getTimeTypes()
      .subscribe(timeTypes => this.timeTypes = timeTypes);

    this.basicTimeOptions = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'userControl': [this.defaultValues.userControl, [Validators.required]],
      'TimeTypeControl': [this.defaultValues.TimeTypeControl, [Validators.required]],
      'descriptionControl': [this.defaultValues.descriptionControl, [Validators.required]],
      'dateControl': [this.defaultValues.dateControl, [Validators.required]],
      'hoursControl': [this.defaultValues.hoursControl, [Validators.required]],
      'minutesControl': [this.defaultValues.minutesControl, [Validators.required]],
    });

  }

  parseDate(date): string {
    let d: Date;
    try {
      d = new Date(date);
    } catch {
      d = new Date();
    } finally {
      return this.datepipe.transform(d, 'yyyy-MM-dd');
    }
  }

  habilitar(): boolean{
    
    if(this.role == 1 || this.id == this.reported_by_id || this.id == this.lead_id){
      return false;
    }else{
      return true;
    }
  }

  validar(): boolean{
    var result: boolean = true;
    var message: string = '';
    if (this.basicTimeOptions.get('userControl').errors != null) {
      if (this.basicTimeOptions.get('userControl').errors.required) {
        result = false;
        message = 'Usuario';
      }
    }
    if (this.basicTimeOptions.get('TimeTypeControl').errors != null) {
      if (this.basicTimeOptions.get('TimeTypeControl').errors.required) {
        result = false;
        if (message != '') {
          message += ', ';
        }
        message += 'Tipo';
      }
    }
    if (this.basicTimeOptions.get('descriptionControl').errors != null) {
      if (this.basicTimeOptions.get('descriptionControl').errors.required) {
        result = false;
        if (message != '') {
          message += ', ';
        }
        message += 'Descripción';
      }
    }
    if (this.basicTimeOptions.get('dateControl').errors != null) {
      if (this.basicTimeOptions.get('dateControl').errors.required) {
        result = false;
        if (message != '') {
          message += ', ';
        }
        message += 'Fecha';
      }
    }
    if (this.basicTimeOptions.get('hoursControl').errors != null) {
      if (this.basicTimeOptions.get('hoursControl').errors.required) {
        result = false;
        if (message != '') {
          message += ', ';
        }
        message += 'Horas';
      }
    }
    if (this.basicTimeOptions.get('minutesControl').errors != null) {
      if (this.basicTimeOptions.get('minutesControl').errors.required) {
        result = false;
        if (message != '') {
          message += ', ';
        }
        message += 'Minutos';
      }
    }
    if (!result){
      message += ' vacio';
    }
    this.message = message;
    return result;
  }

  crear(){
    this.validation = true;
    if (this.validar()){
      this.validation = true;
      this.newItemTime.item_id = this.itemId;
      this.newItemTime.time_type_id = this.basicTimeOptions.get('TimeTypeControl').value;
      this.newItemTime.description = this.basicTimeOptions.get('descriptionControl').value;
      this.newItemTime.date_work = this.parseDate(this.basicTimeOptions.get('dateControl').value);
      this.newItemTime.hours = this.basicTimeOptions.get('hoursControl').value;
      this.newItemTime.minutes = this.basicTimeOptions.get('minutesControl').value;
      this.newItemTime.is_active = 1;
      this.newItemTime.user_creates_id = this.basicTimeOptions.get('userControl').value;
      this.newItemTime.user_updates_id = parseInt(sessionStorage.id);
      this._itemTimesService.addTime(this.newItemTime);
      this.newItemTime= {};
      this.emitFlagCrearTime.emit(false);
    }else{
      this.validation = false;
    }
   
    
  }

  editar(){
    this.validation = true;
    if (this.validar()){
      var editado: boolean = false;
      if(this.basicTimeOptions.get('TimeTypeControl').value != this.defaultValues.TimeTypeControl){
        this.newItemTime.time_type_id = this.basicTimeOptions.get('TimeTypeControl').value;
        editado = true;
      }
      if(this.basicTimeOptions.get('descriptionControl').value != this.defaultValues.descriptionControl){
        this.newItemTime.description = this.basicTimeOptions.get('descriptionControl').value;
        editado = true;
      }
      if(this.parseDate(this.basicTimeOptions.get('dateControl').value) != this.parseDate(this.defaultValues.dateControl)){
        this.newItemTime.date_work = this.parseDate(this.basicTimeOptions.get('dateControl').value);
        editado = true;
      }
      if(this.basicTimeOptions.get('hoursControl').value != this.defaultValues.hoursControl){
        this.newItemTime.hours = this.basicTimeOptions.get('hoursControl').value;
        editado = true;
      }
      if(this.basicTimeOptions.get('minutesControl').value != this.defaultValues.minutesControl){
        this.newItemTime.minutes = this.basicTimeOptions.get('minutesControl').value;
        editado = true;
      }
      if(this.basicTimeOptions.get('userControl').value != this.defaultValues.userControl){
        this.newItemTime.user_creates_id = this.basicTimeOptions.get('userControl').value;
        editado = true;
      }
      if(editado){
        if(this.itemTime.user_updates_id != parseInt(sessionStorage.id)){
          this.newItemTime.user_updates_id = parseInt(sessionStorage.id);
        }
      }
      
      this._itemTimesService.updateTime(this.newItemTime, this.itemTime.id);
      
      this.newItemTime= {};
      this.emitFlagCrearTime.emit(false);
    }else{
      this.validation = false;
    }
  }

  cancel(){
    this.emitFlagCrearTime.emit(false);
  }

  _openTimeTypes(ev:boolean) {
    if(ev) {
      this._timeTypesService.getTimeTypes()
      .subscribe(timeTypes => this.timeTypes = timeTypes);
    }
  }
  
  _openUsers(ev:boolean) {
    if(ev) {
      this.usersFitered = [] 
      this._usersService.getUsers()
      .subscribe(users => 
        {
          this.users = users;
          this._itemResourcesService.getResourcesByItem(this.itemId)
            .subscribe( (itemResources: ItemResource[]) =>
              {
                if(this.role==1 || this.reported_by_id == this.id || this.id == this.lead_id){
                  for (let index = 0; index < itemResources.length; index++) {
                    this.usersFitered.push(this.users.filter(user => user.id == itemResources[index].sysuser_id)[0]);
                  }
                }else{
                  this.usersFitered.push(this.users.filter(user => user.id == sessionStorage.id)[0]);
                }
              }
            )
        });
    }
  }

}
