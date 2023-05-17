import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable, distinctUntilChanged, take, map } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ROUTES_DATA } from "@shared";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.checkAuthed().pipe(
      map((auth) => {
        if (!auth) {
          this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url]);
        }
        return auth;
      })
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkAuthed();
  }

  private checkAuthed(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map((authState) => !!authState)
    );
  }
}
