import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { PrioritiesService } from "src/app/services/priorities.service";


@Injectable({
  providedIn: 'root'
})
export class PrioritiesResolver implements Resolve<TableData> {

  constructor(
    private prioritiesService: PrioritiesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.prioritiesService.getPrioritiesAll();
  }
}
