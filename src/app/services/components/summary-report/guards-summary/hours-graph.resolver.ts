import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HoursGraph } from "../../../models/hours-graph";
import { IndictorsHoursGraphService } from "../../../services/summary-report/indictors-hours-graph.service";

@Injectable()
export class HoursGraphResolver implements Resolve<HoursGraph> {

  constructor(
    private _indicaatorsHoursGraphService: IndictorsHoursGraphService
  ) {}

  dateTo = new Date();
  dateFrom = new Date(
    (this.dateTo.getFullYear()),
    this.dateTo.getMonth()-11,
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
      return this._indicaatorsHoursGraphService.getHoursItems(this.objDate);
  }
}
