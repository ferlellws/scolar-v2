import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { ApplicationsService } from "src/app/services/applications.service";


@Injectable({
  providedIn: 'root'
})
export class ApplicationsResolver implements Resolve<TableData> {

  constructor(
    private applicationsService: ApplicationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.applicationsService.getApplicationsAll();
  }
}
