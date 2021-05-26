import { IconsService } from '../../../services/icons.service';
import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Icon } from 'src/app/models/icon';
import { ItemType } from 'src/app/models/item-type';
import { ItemTypeService } from 'src/app/services/item-type.service';

@Injectable()
export class ItemTypesResolver implements Resolve<ItemType> {

  constructor(
    private _itemTypesService: ItemTypeService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this._itemTypesService.getItemTypes();
      // return this.backend.fetchTeam(route.params.id);
  }
}
