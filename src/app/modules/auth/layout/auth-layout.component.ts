import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthImageType } from "@shared";

@Component({
  selector: 'promo-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  activatedRoute = inject(ActivatedRoute);

  authImagType$: Observable<AuthImageType> = this.activatedRoute.children?.[0].data.pipe(
    map((data) => data?.imageType ?? AuthImageType.SignIn)
  );

}
