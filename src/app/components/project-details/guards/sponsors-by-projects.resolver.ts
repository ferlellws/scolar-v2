import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OperationSponsorsService } from 'src/app/services/operation-sponsors.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorsByProjectsResolver implements Resolve<boolean> {
  constructor(
    private operationSponsorsService: OperationSponsorsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      return this.operationSponsorsService.getOperationSponsorByProjectIdWithDedication(route.params.id);
  }
}
