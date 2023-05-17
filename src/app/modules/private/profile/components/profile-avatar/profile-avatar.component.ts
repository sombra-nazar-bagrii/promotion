import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IUser, SNACK_BAR, LoaderService, SnackBarService } from "@shared";
import { IOutPutData } from "../../../../../shared/components/file-upload";
import { switchMap } from "rxjs";
import { UserService } from "@modules/private/profile/user.service";
import { ProfileService } from "@core";

@Component({
  selector: 'promo-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileAvatarComponent implements OnInit {

  @Input() set current(user: IUser) {
    this._userId = user.uid;
    this.avatarPreview = user.photoURL;
    this._currentAvatar = user.photoURL;
  };

  private _userId;
  private _currentAvatar;
  avatar: IOutPutData;
  avatarPreview: string;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  onFileUpload(file: IOutPutData) {
    this.avatar = file;
    this.avatarPreview = file?.base64;
  }

  onAvatarUpload() {
    if (!this.avatar) return;
    this.loaderService.setLoaderStatus(true);
    this.userService.uploadUserAvatar(this.avatar?.fileToUpload, this._userId).pipe(
      switchMap(() => this.profileService.invokeUserProfile())
    )
      .subscribe(() => {
        this.loaderService.setLoaderStatus(false);
        this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.user_info_updated);
      })
  }

  clearUploadFile() {
    this.avatar = undefined;
    this.avatarPreview = this._currentAvatar;
  }
}
