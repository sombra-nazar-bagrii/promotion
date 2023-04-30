import { ChangeDetectionStrategy, Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'promo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  constructor() { }

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
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileModule {}
