import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ManagementsService } from "src/app/services/managements.service";


@Injectable({
  providedIn: 'root'
})
export class ManagementsResolver implements Resolve<TableData> {

  constructor(
    private managementsService: ManagementsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.managementsService.getManagementsAll();
  }
}
