import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { Observable, distinctUntilChanged, take, map } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ROUTES_DATA } from "@shared";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
    ) {
  }

  canActivate(): Observable<boolean> {
    return this.checkAuthed().pipe(
      map((authed) => {
        if (authed) {
          this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);
        }
        return !authed;
      })
    );
  }

  private checkAuthed(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map((authState) => !!authState)
    );
  }
}
