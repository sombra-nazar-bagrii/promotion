import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ProfileService } from "@core";
import { UserService } from "../../user.service";
import { IUser, SnackBarService, LoaderService, SNACK_BAR } from "@shared";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { switchMap } from "rxjs";

@Component({
  selector: 'promo-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent implements OnInit {

  @Input() current: IUser;
  userInfoForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private loaderService: LoaderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._buildForm(this.current);
  }

  updateUserData() {
    if (this.userInfoForm.invalid) return;
    this.loaderService.setLoaderStatus(true);
    this.userService.updateUserData(this.current.uid, this.userInfoForm.value).pipe(
      switchMap(() => this.profileService.invokeUserProfile())
    )
      .subscribe(() => {
        this.loaderService.setLoaderStatus(false);
        this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.user_info_updated);
      })
  }

  private _buildForm(user: Partial<IUser>) {
    this.userInfoForm = this.fb.group({
      userName: [user?.userName, Validators.compose([Validators.required, Validators.minLength(6)])],
      age: [user?.age, Validators.compose([Validators.required])]
    });
  }

}
