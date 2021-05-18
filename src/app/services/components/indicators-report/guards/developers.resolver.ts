import { IndicatorsReportService } from '../../../services/indicators-report/indicators-report.service';
import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class DevelopersResolver implements Resolve<any> {

  constructor(
    private _usersService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any[]>|Promise<any[]>|any[] {
      return this._usersService.getUsersByRole(3);
  }
}
