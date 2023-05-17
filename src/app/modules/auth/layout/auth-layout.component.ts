import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { map, Observable, filter, switchMap } from "rxjs";
import { AuthImageType, LoaderService } from "@shared";

@Component({
  selector: 'promo-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {

  loader$ = this.loaderService.getLoader$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) {
  }

  authImagType$: Observable<AuthImageType> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    switchMap(() => this.activatedRoute.firstChild.data),
    map((data) => data?.imageType ?? AuthImageType.SignIn)
  )

}
