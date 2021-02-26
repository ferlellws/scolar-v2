import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { StatesService } from "src/app/services/states.service";


@Injectable({
  providedIn: 'root'
})
export class StatesResolver implements Resolve<TableData> {

  constructor(
    private statesService: StatesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.statesService.getStatesAll();
  }
}
