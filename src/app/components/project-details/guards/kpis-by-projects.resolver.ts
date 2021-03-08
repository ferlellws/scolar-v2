import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BenefitsService } from 'src/app/services/benefits.service';
import { KpisService } from 'src/app/services/kpis.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class KpisByProjectsResolver implements Resolve<boolean> {
  constructor(
    private kpisByProjectsResolver: KpisService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      //return this.kpisByProjectsResolver.getKpiByProjectId(route.params.id);
      return this.kpisByProjectsResolver.getKpis();
  }
}
