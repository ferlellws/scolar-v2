import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemResource } from 'src/app/models/item-resource';
import { ItemResourcesService } from 'src/app/services/items/item-resources.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tecno-item-resources',
  templateUrl: './item-resources.component.html',
  styleUrls: ['./item-resources.component.scss']
})
export class ItemResourcesComponent implements OnInit {
  elegido: any = {};
  users: any[] = [];
  resources: ItemResource [] = [];
 

  resourceOptions: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  filteredOptions: Observable<string[]>;

  options: any[] =[] 

  deshabilitado: boolean = true;

  @Input() item: any;
  @Input() project: any;

  constructor(
    private fb: FormBuilder,
    private _itemResourcesService: ItemResourcesService,
    private _usersService: UserService,
    
  ) { }

  ngOnInit(): void {
    this.resourceOptions = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'resourceControl': [],
    });

    this.filteredOptions = this.resourceOptions.get('resourceControl').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this._itemResourcesService.getResourcesByItem(this.item.id).
      subscribe(resources => 
        {
          this.resources = resources;
          this.deshabilitar();
        });
    
    this._usersService.getUsers()
      .subscribe(users => {
        this.users = users
        this.options = this.getFilteredUsers();
      });

    this._itemResourcesService.emitDeleteResource
    .subscribe(data=>{
      this._itemResourcesService.getResourcesByItem(this.item.id).
      subscribe(resources => 
        {
          this.resources = resources;
          this.deshabilitar();
        });
    });

    this._itemResourcesService.emitAddResource
      .subscribe((data: ItemResource) => {
        this.resources.push(data);
        this.deshabilitar();
      })

  }

  getUser(id: number){
    return this.users.filter(user => user.id == id)[0];
  }

  getFilteredUsers(){
    var result: any[] = this.users;
    for (let index = 0; index < this.resources.length; index++) {
      result = result.filter( user => user.id != this.resources[index].sysuser_id);
    }
    return result;
  }

  

  deleteResource(id: number){
    this._itemResourcesService.deleteResource(id);
  }

  addResource(){
    var newResource ={
      item_id : this.item.id,
      sysuser_id :this.resourceOptions.get('resourceControl').value,
      is_active: true,
      user_creates_id: sessionStorage.id,
      user_updates_id: sessionStorage.id,
    }
    this._itemResourcesService.addResource(newResource);
    this.resourceOptions.get('resourceControl').setValue('');
  }

  _openUsers(ev:boolean) {
    if(ev) {
      this.options = this.getFilteredUsers();
    }
  }

  deshabilitar(){
    if(this.resources.length >= 1 && !this.project.is_multiple_resources){
      this.deshabilitado = true;
    }else{
      this.deshabilitado = false;
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    var filtrado = this.options;
    filtrado =  filtrado.filter(option => `${option.firstname}${option.lastname}`.toLowerCase().includes(filterValue));
    this.elegido = filtrado[0];
    return filtrado;
  }

}
