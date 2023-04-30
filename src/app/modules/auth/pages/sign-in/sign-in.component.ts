import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { ROUTES_DATA } from "@shared";
import { AuthService } from "@core";

@Component({
  selector: 'promo-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  ROUTES_DATA = ROUTES_DATA;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  signInWithCredentials() {
    if (this.loginForm.invalid) return;
    this.authService.signIn(this.loginForm.value as { email: string; password: string; })
  }

  signInWithFacebook() {

  }

  signInWithGoogle() {

  }


}
