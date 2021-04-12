import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ProgramsService } from "src/app/services/programs.service";
import { ValoremService } from "src/app/services/valorem.service";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProjectProgressCreateResolver implements Resolve<TableData> {

  constructor(
    private valoremService:ValoremService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
      environment.consoleMessage(route.params.id, "Ruta ID <<<<<<<<<<<<<<");
      //return this.valoremService.getValoremIdProject(route.params.id);
      return this.valoremService.getValoremSelect();
  }
}
