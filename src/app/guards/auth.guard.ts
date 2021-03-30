import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  userIsAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.accessVerify(route.routeConfig!.path!);
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    let partes = route.path?.split("/")
    let contador = 0;
    let backRoute = "";
    for (let index = 0; index < partes!.length; index++) {
      if(partes![index][0] == ":"){
        contador++;
        backRoute += `/param${contador}`;
      }else{
        backRoute += `/${partes![index]}`
      }
    }
    
    var coso = await this.authService.accessPage(backRoute);
    localStorage.access_to_accions = JSON.stringify(coso.access_to_accions)
    if (!coso.access_page){
      this.router.navigate(['/']);
      localStorage.clear();
    }
    return coso.access_page;
  }

  private accessVerify(path: string) {
    if (this.authService.userIsAuthenticated(path)) {
      return true;
    }
    localStorage.clear();
    this.router.navigate(['/']);
    return false;
  }

}
