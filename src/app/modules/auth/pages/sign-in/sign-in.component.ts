import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { ROUTES_DATA } from "@shared";
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
    // EmailFormatValidator
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signInWithCredentials() {
    if (this.loginForm.invalid) return;
    this.authService.signIn(this.loginForm.value)
  }

  signInWithFacebook = this.authService.fbAuth;
  signInWithGoogle = this.authService.googleAuth;


}
