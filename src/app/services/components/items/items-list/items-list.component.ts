import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

// MODULES
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemTypeService } from 'src/app/services/item-type.service';
import { ItemType } from 'src/app/models/item-type';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';
import { ItemsIndicatorsService } from 'src/app/services/items/items-indicators.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'tecno-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  @Input() project: any;
  @Input() mode: number;

  numberRequest = -1;
  itemsProject: any [] = [];
  itemTypes: any[] = [];
  icons: Icon[] = [];
  totalItems: number;
  labelAction: string;
  i = 0;
  role = parseInt(sessionStorage.sysrole_id);
  id = parseInt(sessionStorage.id);
  developer_company_id = null;

  constructor(
    private _itemsService: ItemsService,
    private _projectsService: ProjectsService,
    private _itemsIndicatorsService: ItemsIndicatorsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.project);
    this.developer_company_id = this.route.snapshot.params['developer_company_id'];
    console.log("=============================>>>>>>>>>>>>>>>> this.developer_company_id: ", this.developer_company_id);

    // this.developer_company_id = this.route;
    // this.route.queryParams
    //   .subscribe((queryParams: any) => {
    //     console.log("=============================>>>>>>>>>>>>>>>> ", queryParams['developer_company_id']);
    //   });

    this.route.data.subscribe(
      (data) => {
        this.icons = data.icons;
        this.itemTypes = data.itemTypes;
      }
    );

    // this._itemTypesService.getItemTypes()
    //   .subscribe( itemTypes => this.itemTypes = itemTypes);

    // this._iconsService.getIcons()
    //   .subscribe( icons =>
    //     {
    //       this.icons = icons;
    //     }
    //   );

    this.fillItems();

    this._itemsService.emitModifyItem.subscribe(item =>
      {
        this.fillItems();
        this.openSnackBar(true, `${item.id} Requerimiento Modificado`, "Aceptar");
      }
    );

    this._itemsService.emitDeleteItem.subscribe(data =>
      {
        if(data == 200){
          this.openSnackBar(true, `${data.id} Requerimiento Eliminado`, "Aceptar");
        }else if(data == 409){
          this.openSnackBar(false, "Conflicto", "Aceptar");
        }
      }
    );

    this._itemsService.emitAddItem.subscribe(
      (data) => {
        this.fillItems();
        this.openSnackBar(true, `${data.id} Requerimiento Creado`, "Aceptar");
      }
    );
    this.labelAction = "Editar";
  }


  onDeleteItem(itemId: string) {
    this._itemsService.deleteItem(itemId);
   // this.itemsService.deleteItem(itemId);
  }

  getAutorization(id: number): boolean{
    let item = this.itemsProject.filter(item => item.id == id)[0];
    return this.role == 1 || item.reported_by_id == this.id || this.project.lead_id == this.id;
  }

  getColor(id: number): string{
    return this.itemTypes.filter(itemType => itemType.id == id)[0].color;
  }

  getIcon(id: number): string{
    var icon_id = this.itemTypes.filter(itemType => itemType.id == id)[0].icon_id;
    return this.icons.filter(icon => icon.id == icon_id)[0].title;
  }

  fillItems() {

    if (this.mode == null || this.mode == 0) {
      this._itemsService.getItemsByProjectId(this.project.id, this.developer_company_id)
      .subscribe(projectItems =>
        {
          this.itemsProject = projectItems;
          this.totalItems = this.itemsProject.length;
        }
      );
    } else {
      this._projectsService.getItemsProject(parseInt(this.project.id), this.developer_company_id)
        .subscribe(items =>
          {
            items = items[0].indicators;
            if (this.mode == 0) {
              this.itemsProject = items[0].data;
              this.totalItems = items[0].items_to_expire_count;
            } else if (this.mode == 1) {
              this.itemsProject = items[1].data;
              this.totalItems = items[1].items_expired_count;
            } else if (this.mode == 2) {
              this.itemsProject = items[2].data;
              this.totalItems = items[2].items_anticipated_count;
            } else if (this.mode == 3) {
              this.itemsProject = items[3].data;
              this.totalItems = items[3].items_ontime_count;
            } else if (this.mode == 4) {
              this.itemsProject = items[4].data;
              this.totalItems = items[4].items_no_time_count;
            } else if (this.mode == 5) {
              this.itemsProject = items[5].data;
              this.totalItems = items[5].items_develop_count;
            } else if (this.mode == 6) {
              this.itemsProject = items[6].data;
              this.totalItems = items[6].items_late_count;
            }
          });
    }
  }

  openSnackBar(succes: boolean, message: string, action: string) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: panelClass
    });
  }

  onExpand(id: number) {
    // console.log("# req: ", id);
    this.numberRequest = id;
  }
}
