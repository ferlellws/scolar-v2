import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ProjectsService } from "src/app/services/projects.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectsResolver implements Resolve<TableData> {

  constructor(
    private projectService: ProjectsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<TableData> |Promise<any>|any{
      return this.projectService.getProjectsAll();
  }
}
