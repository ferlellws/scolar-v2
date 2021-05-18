import { IndicatorsReportService } from '../../../services/indicators-report/indicators-report.service';
import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class GeneralIndicatorsHoursDevelopersResolver implements Resolve<any> {

  constructor(
    private _indicatorsReportService: IndicatorsReportService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this._indicatorsReportService.getGeneralIndicatorsHoursDevelopers();
      // return this.backend.fetchTeam(route.params.id);
  }
}
