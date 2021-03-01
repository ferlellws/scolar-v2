import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ProgramsService } from "src/app/services/programs.service";


@Injectable({
  providedIn: 'root'
})
export class ProgramsResolver implements Resolve<TableData> {

  constructor(
    private programsService: ProgramsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.programsService.getProgramsAll();
  }
}
