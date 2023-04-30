import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, ProfileService } from "@core";

@Component({
  selector: 'promo-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut()
  }
}
