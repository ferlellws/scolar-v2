import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { StrategicApproachesService } from "src/app/services/strategic-approaches.service";


@Injectable({
  providedIn: 'root'
})
export class StrategicApproachesResolver implements Resolve<TableData> {

  constructor(
    private strategicApproachesService: StrategicApproachesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.strategicApproachesService.getStrategicApproachesAll();
  }
}
