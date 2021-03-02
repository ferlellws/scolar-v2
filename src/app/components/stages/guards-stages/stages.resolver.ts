import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { StagesService } from "src/app/services/stages.service";


@Injectable({
  providedIn: 'root'
})
export class StagesResolver implements Resolve<TableData> {

  constructor(
    private stagesService: StagesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.stagesService.getStagesAll();
  }
}
