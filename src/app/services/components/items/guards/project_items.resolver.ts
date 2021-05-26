import { IconsService } from './../../../services/icons.service';
import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TemporalItemsService } from 'src/app/services/temporal-items.service';
import { Item } from 'src/app/models/item';

@Injectable()
export class ProjectItemsResolver implements Resolve<Item> {

  constructor(
    private _temporalItemsService: TemporalItemsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      let projectId = route.params['id'];

      return this._temporalItemsService.getTemporalItemsByProjectId(projectId);
      // return this.backend.fetchTeam(route.params.id);
  }
}
