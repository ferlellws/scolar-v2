import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { StateByPhasesService } from "src/app/services/state-by-phases.service";


@Injectable({
  providedIn: 'root'
})
export class StateByPhasesResolver implements Resolve<TableData> {

  constructor(
    private stateByPhasesService: StateByPhasesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<TableData> |Promise<any>|any{
      return this.stateByPhasesService.getStateByPhasesAll();
  }
}
