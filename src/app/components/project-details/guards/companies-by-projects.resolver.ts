import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompaniesByProjectService } from 'src/app/services/companies-by-project.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesByProjectsResolver implements Resolve<boolean> {
  constructor(
    private companiesByProjectService: CompaniesByProjectService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.companiesByProjectService.getCompanyByProjects();
      //return this.companiesByProjectService.getCompanyByProjectByProjectId(route.params.id);
  }
}
