import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { DesviationCausesService } from "src/app/services/desviation-causes.service";


@Injectable({
  providedIn: 'root'
})
export class DesviationCausesByAreasResolver implements Resolve<TableData> {

  constructor(
    private desviationCausesService: DesviationCausesService
  ) {}
  years: any = "";
  months: any = "";
  projects: any = "";
  typifications: any = "";

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.desviationCausesService.getDesviationCausesByAreas(this.years, this.months, this.projects, this.typifications);
  }
}
