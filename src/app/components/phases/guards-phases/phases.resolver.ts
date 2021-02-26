import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { PhasesService } from "src/app/services/phases.service";


@Injectable({
  providedIn: 'root'
})
export class PhasesResolver implements Resolve<TableData> {

  constructor(
    private phasesService: PhasesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.phasesService.getPhasesAll();
  }
}
