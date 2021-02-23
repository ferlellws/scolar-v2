import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Project } from "src/app/models/project";
import { ProjectsService } from "src/app/services/projects.service";

@Injectable()
export class ProjectsResolver implements Resolve<Project> {

  constructor(
    private _projectService: ProjectsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this._projectService.getProjectsAll();
      // return this.backend.fetchTeam(route.params.id);
  }
}
