import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SummaryReportService } from '../../../services/summary-report/summary-report.service';

@Injectable()
export class OpportunityBehaviorResolver implements Resolve<any> {

  constructor(
    private _summaryReportService: SummaryReportService
  ) {}

  dateTo = new Date();
  dateFrom = new Date(
    (this.dateTo.getFullYear()),
    this.dateTo.getMonth()-4,
    this.dateTo.getDate()
  );

  objDate = {
    reception_date_to: `${this.dateTo.getFullYear()}-${this.dateTo.getMonth()+1}-${this.dateTo.getDate()}`,
    reception_date_from:  `${this.dateFrom.getFullYear()}-${this.dateFrom.getMonth()+1}-${this.dateFrom.getDate()}`
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this._summaryReportService.getOpportunityBehavior(this.objDate);
      // return this.backend.fetchTeam(route.params.id);
  }
}
