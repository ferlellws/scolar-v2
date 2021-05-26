import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

// MODULES
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemTypeService } from 'src/app/services/item-type.service';
import { ItemType } from 'src/app/models/item-type';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';
import { TemporalItemsService } from 'src/app/services/temporal-items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tecno-temporal-item-list',
  templateUrl: './temporal-item-list.component.html',
  styleUrls: ['./temporal-item-list.component.scss']
})
export class TemporalItemListComponent implements OnInit {

  @Input() project: any;

  temporalItems: any[] = [];
  itemsProject: any [] = [];
  icons: Icon[] = [];
  totalItems: number;
  labelAction: string;
  i = 0;

  constructor(
    private _itemsService: ItemsService,
    private _temporalItemsService: TemporalItemsService,
    private _iconsService: IconsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data) => {
        this.icons = data.icons;
        console.log("Entra a Icons", data);
        this.temporalItems = data.project_items;

        this.totalItems = this.temporalItems.length;
        for (let index = 0; index < this.temporalItems.length; index++) {
          this.temporalItems[index].iconName = this.icons.filter(icon => icon.id == this.temporalItems[index].item_type.icon_id)[0].title;
          this.temporalItems[index].item_type_id = this.temporalItems[index].item_type.id;
        }
      }
    );

    this._temporalItemsService.emitAddTemporalItem.subscribe(temporalItem =>
      {
        temporalItem.iconName = this.icons.filter(icon => icon.id == temporalItem.item_type.icon_id)[0].title;
        temporalItem.item_type_id = temporalItem.item_type.id;
        this.temporalItems.push(temporalItem);
        this.totalItems = this.temporalItems.length;
      }
    );

    this._itemsService.emitCreateFormTemp.subscribe(data =>
      {
        this._iconsService.getIcons()
        .subscribe( icons =>
          {
            this.icons = icons;

            this._temporalItemsService.getTemporalItemsByProjectId(this.project.id)
              .subscribe(temporalItems =>
              {
                this.temporalItems = temporalItems;
                this.totalItems = this.temporalItems.length;
                for (let index = 0; index < this.temporalItems.length; index++) {
                  this.temporalItems[index].iconName = this.icons.filter(icon => icon.id == this.temporalItems[index].item_type.icon_id)[0].title;
                  this.temporalItems[index].item_type_id = this.temporalItems[index].item_type.id;
                }
              }
            );
          });
      }
    );

    this._temporalItemsService.emitDeleteTemporalItem.subscribe(temporalItem =>
      {
        this._iconsService.getIcons()
          .subscribe( icons =>
          {
            this.icons = icons;

            this._temporalItemsService.getTemporalItemsByProjectId(this.project.id)
              .subscribe(temporalItems =>
                {
                  this.temporalItems = temporalItems;
                  this.totalItems = this.temporalItems.length;
                  for (let index = 0; index < this.temporalItems.length; index++) {
                    this.temporalItems[index].iconName = this.icons.filter(icon => icon.id == this.temporalItems[index].item_type.icon_id)[0].title;
                    this.temporalItems[index].item_type_id = this.temporalItems[index].item_type.id;
                  }
                }
              );
          }
        );
      }
    );


    this.labelAction = "Editar";

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemsProject, event.previousIndex, event.currentIndex);
  }

  onDeleteItem(temporalItemId: string) {
   this._temporalItemsService.deleteTemporalItem(temporalItemId);

  }

}
