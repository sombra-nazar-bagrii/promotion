import { Component, OnInit } from '@angular/core';
import { ROUTES_DATA, EmailFormatValidator, ConfirmPasswordValidator } from '@shared';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@core";

@Component({
  selector: 'promo-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  ROUTES_DATA = ROUTES_DATA;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._buildForm();
  }

  signUpWithFacebook() {

  }

  signUpWithGoogle() {

  }

  private _buildForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailFormatValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: ConfirmPasswordValidator('password', 'confirmPassword')
    })
  }

  signUpWithCredentials() {
    if (this.registerForm.invalid) return;
    this.authService.signUp(this.registerForm.value);
  }
}
