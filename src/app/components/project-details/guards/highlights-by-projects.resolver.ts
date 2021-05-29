import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BenefitsService } from 'src/app/services/benefits.service';
import { HighlightsService } from 'src/app/services/highlights.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class HighlightsByProjectsResolver implements Resolve<boolean> {
  constructor(
    private highlightsService: HighlightsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.highlightsService.getHighlightsByProjectSpecificData(route.params.id);
  }
}
