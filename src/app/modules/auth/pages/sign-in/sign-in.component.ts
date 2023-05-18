import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { ROUTES_DATA, EmailFormatValidator } from "@shared";
import { AuthService } from "@core";

@Component({
  selector: 'promo-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  ROUTES_DATA = ROUTES_DATA;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    // TODO EmailFormatValidator
    email: ['', Validators.compose([Validators.required])],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signInWithCredentials() {
    if (this.loginForm.invalid) return;
    this.authService.signIn(this.loginForm.value)
  }

  signInWithFacebook = this.authService.fbAuth;
  signInWithGoogle = this.authService.googleAuth;
}
