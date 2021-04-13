import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ProgramsService } from "src/app/services/programs.service";
import { ProjectsService } from "src/app/services/projects.service";
import { ValoremService } from "src/app/services/valorem.service";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProjectProgressCreateResolver implements Resolve<TableData> {

  constructor(
    private valoremService:ValoremService,
    private projectsService:ProjectsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
      //return this.valoremService.getValoremIdProject(route.params.id);
      // let obj:any = {
      //   project: this.projectsService.getProjectsId(route.params.id),
      //   valorem: this.projectsService.getProjectsId(route.params.id)
      // }   
      // return obj;
      return this.projectsService.getProjectsId(route.params.id)
  }
}
