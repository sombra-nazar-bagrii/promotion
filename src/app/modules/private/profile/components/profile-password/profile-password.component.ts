import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IUser, SnackBarService, LoaderService, ConfirmPasswordValidator, SNACK_BAR } from "@shared";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@core";

@Component({
  selector: 'promo-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePasswordComponent implements OnInit {

  @Input() current: IUser;
  userPasswordForm: FormGroup;

  constructor(
    private snackBarService: SnackBarService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._buildForm();
  }

  changeUserPassword() {
    if (this.userPasswordForm.invalid) return;
    this.loaderService.setLoaderStatus(true);

    const { newPassword } = this.userPasswordForm.value;

    this.authService.changePassword(newPassword).subscribe(() => {
      this.loaderService.setLoaderStatus(false);
      this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.user_password_updated);
    })

  }

  private _buildForm() {
    this.userPasswordForm = this.fb.group({
      currentPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: ConfirmPasswordValidator('newPassword', 'confirmNewPassword')
    });
  }

}
