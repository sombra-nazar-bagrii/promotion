import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@core";

@Component({
  selector: 'promo-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  userEmailForm = this.fb.group({
    // EmailFormatValidator
    email: ['', Validators.compose([Validators.required])]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  requestPasswordReset() {
    if (this.userEmailForm.invalid) return;
    const { email } = this.userEmailForm.value;
    this.authService.forgotPassword(email);
  }
}
