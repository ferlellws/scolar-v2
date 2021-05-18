import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// SERVICES
import { ItemsService } from 'src/app/services/items.service';
import { Icon } from 'src/app/models/icon';
import { IconsService } from 'src/app/services/icons.service';
import { ItemTypeService } from 'src/app/services/item-type.service';
import { TemporalItemsService } from 'src/app/services/temporal-items.service';

@Component({
  selector: 'tecno-items-form-basic',
  templateUrl: './items-form-basic.component.html',
  styleUrls: ['./items-form-basic.component.scss']
})
export class ItemsFormBasicComponent implements OnInit {

  icons: Icon[] = [];
  itemTypes: any[] = []
  newTemp: any = {};

  @Input() flagCrear: boolean;
  @Input() projectId: number;
  @Output() emitFlagCrear = new EventEmitter<boolean>();

  basicOptions: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  selectItemTypeDefault = {
    id: '1',
    icon: "assignment",
    title: "Requerimiento",
    color: "#4CAF50"
  };
  selectItemTypes = new FormControl('1');

  selectItemTypesList: any[] = [
    {
      id: '1',
      icon: "assignment",
      title: "Requerimiento",
      color: "#4CAF50"
    },
    {
      id: '2',
      icon: "assignment_late",
      title: "Soporte",
      color: "#F44336"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private _itemsService: ItemsService,
    private _projectsService: ProjectsService,
    private _iconsService: IconsService,
    private _itemTypesService: ItemTypeService,
    private _temporalItemsSrvice: TemporalItemsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.icons = data.icons;
        this.itemTypes = data.itemTypes;
        for (let index = 0; index < this.itemTypes.length; index++) {
          var icon = this.icons.filter(icon => icon.id == this.itemTypes[index].icon_id)[0];
          if(icon != null) {
            this.itemTypes[index].iconName =  icon.title;
          }
        }
      }
    );

    this.basicOptions = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'titleControl': [],
      'selectItemTypes': [1],
    });

  }

  _openItemTypes(ev:boolean) {
    if(ev) {
      this._itemTypesService.getItemTypes()
      .subscribe(itemTypes =>{
         this.itemTypes = itemTypes;
         for (let index = 0; index < this.itemTypes.length; index++) {
          var icon = this.icons.filter(icon => icon.id == this.itemTypes[index].icon_id)[0];
          if(icon != null) {
            this.itemTypes[index].iconName =  icon.title;
          }
        }

      });
    }
  }

  getSelectedType() {
    var selected = this.itemTypes.filter(itemType => itemType.id == this.basicOptions.get('selectItemTypes').value )[0];
    if(selected!= null) {
      return selected;
    }else {
      return {};
    }

  }

  addItemBasic() {

    this.newTemp.item_type_id = this.basicOptions.get('selectItemTypes').value;
    this.newTemp.title = this.basicOptions.get('titleControl').value;
    this.newTemp.project_id = this.projectId;
    this.newTemp.sysuser_id = 3; //quemado
    this._temporalItemsSrvice.addTemporalItem(this.newTemp);
    this.newTemp = {};
    this.emitFlagCrear.emit(false);

  }

  getItemById(itemId: string) {
    return this.selectItemTypesList.filter(item => item.id == itemId);
  }

}
