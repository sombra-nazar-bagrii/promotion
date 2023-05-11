import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, ProfileService } from "@core";
import { Subject } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'promo-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateLayoutComponent implements OnInit {

  searchArticle = new Subject<string>();
  articles$;

  constructor(
    private authService: AuthService,
    public afs: AngularFirestore,
    private profileService: ProfileService,
  ) { }

  currentUser$ = this.profileService.getCurrentUser();

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
  }
}
