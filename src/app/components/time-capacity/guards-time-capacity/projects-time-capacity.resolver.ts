import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsTimeCapacityResolver implements Resolve<boolean> {

  constructor(
    private projectsService: ProjectsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.projectsService.getProjectsSelect();
  }
}
