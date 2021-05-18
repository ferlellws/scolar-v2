import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SummaryReportService } from '../../../services/summary-report/summary-report.service';

@Injectable()
export class QualityGraphResolver implements Resolve<any> {

  constructor(
    private _summaryReportService: SummaryReportService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this._summaryReportService.getQualityGraph();
      // return this.backend.fetchTeam(route.params.id);
  }
}
