import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { UserService } from "src/app/services/user.service";


@Injectable({
  providedIn: 'root'
})
export class GeneralUsersResolver implements Resolve<TableData> {

  constructor(
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<TableData> |Promise<any>|any{
      return this.userService.getUsersTable();
  }
}
