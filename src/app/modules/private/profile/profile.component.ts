import { ChangeDetectionStrategy, Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared";
import { CommonModule } from "@angular/common";
import { PROFILE_COMPONENTS } from "./components";
import { ProfileService } from "@core";

@Component({
  selector: 'promo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  currentUser$ = this.profileService.getCurrentUser();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
  ],
  declarations: [
    ProfileComponent,
    ...PROFILE_COMPONENTS
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
