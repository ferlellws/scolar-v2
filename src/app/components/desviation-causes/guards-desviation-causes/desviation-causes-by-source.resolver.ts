import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { DesviationCausesService } from "src/app/services/desviation-causes.service";


@Injectable({
  providedIn: 'root'
})
export class DesviationCausesBySourceResolver implements Resolve<TableData> {

  constructor(
    private desviationCausesService: DesviationCausesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.desviationCausesService.getDesviationCausesBySource();
  }
}
