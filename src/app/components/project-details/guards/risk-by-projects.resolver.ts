import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BenefitsService } from 'src/app/services/benefits.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { RiskLevelsService } from 'src/app/services/risk-levels.service';
import { RisksService } from 'src/app/services/risks.service';

@Injectable({
  providedIn: 'root'
})
export class RisksByProjectsResolver implements Resolve<boolean> {
  constructor(
    private risksService: RisksService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      //return this.risksService.getRiskByProjectId(route.params.id);
      return this.risksService.getRisks();
  }
}
