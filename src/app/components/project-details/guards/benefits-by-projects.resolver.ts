import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BenefitsService } from 'src/app/services/benefits.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class BenefitsByProjectsResolver implements Resolve<boolean> {
  constructor(
    private benefitsService: BenefitsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.benefitsService.getBenefitsByProjectSpecificData(route.params.id);
  }
}
