import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable, distinctUntilChanged, take, map } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ROUTES_DATA } from "@shared";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  angularFireAuth = inject(AngularFireAuth);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthState();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthState();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthState();
  }

  private checkAuthState(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map(state => {
        if (state) this.router.navigateByUrl(ROUTES_DATA.PRIVATE.url);
        return !state;
      })
    )
  }
}
