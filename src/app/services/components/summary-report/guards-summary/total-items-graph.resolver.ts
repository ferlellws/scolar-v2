import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TotalItemsGraph } from "../../../models/total-items-graph";
import { TotalItemsGraphService } from "../../../services/summary-report/total-items-graph.service";

@Injectable()
export class TotalItemsGraphResolver implements Resolve<TotalItemsGraph> {

  constructor(
    private _totalItemsGraphService: TotalItemsGraphService
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
      return this._totalItemsGraphService.getTotalItems(this.objDate);
  }
}
