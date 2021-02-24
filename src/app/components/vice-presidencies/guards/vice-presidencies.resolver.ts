import { TableData } from 'src/app/models/table-data';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';

@Injectable({
  providedIn: 'root'
})
export class VicePresidenciesResolver implements Resolve<TableData> {

  constructor(public vicePresidenciesService: VicePresidenciesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {

      return this.vicePresidenciesService.getVicePresidenciesAll();
  }
}
