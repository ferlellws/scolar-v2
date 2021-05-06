import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OperationSponsor } from 'src/app/models/operation-sponsor';
import { OperationSponsorsService } from 'src/app/services/operation-sponsors.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorsResolver implements Resolve<boolean> {
  constructor(
    private operationSponsor:OperationSponsorsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.operationSponsor.getOperationSponsorProjectId(route.params.id);
      //return this.operationSponsor.getOperationSponsorsAll();
  }
}
