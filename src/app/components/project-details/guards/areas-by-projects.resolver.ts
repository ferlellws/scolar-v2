import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AreasByProjectService } from 'src/app/services/areas-by-project.service';

@Injectable({
  providedIn: 'root'
})
export class AreasByProjectsResolver implements Resolve<boolean> {
  constructor(
    private areasByProjetcsService: AreasByProjectService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.areasByProjetcsService.getAreaByProjectsFilterProjectSpecificData(route.params.id);   
  }
}
