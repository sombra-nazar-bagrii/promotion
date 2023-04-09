import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, distinctUntilChanged, take, map } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  angularFireAuth = inject(AngularFireAuth);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.angularFireAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map(state => {
        if (state) this.router.navigateByUrl('/');
        return !state;
      })
    );
  }
  
}
