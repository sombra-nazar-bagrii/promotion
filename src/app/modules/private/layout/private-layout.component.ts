import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, ProfileService } from "@core";
import { Observable, startWith, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl } from "@angular/forms";
import { IArticle, ROUTES_DATA, LoaderService } from "@shared";
import { ArticleService } from "@modules/private/article/article.service";

@Component({
  selector: 'promo-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateLayoutComponent implements OnInit {

  navItems: { link: string, title: string, icon: string }[] = [
    {
      link: ROUTES_DATA.PRIVATE.children.DASHBOARD.url,
      title: ROUTES_DATA.PRIVATE.children.DASHBOARD.title,
      icon: 'speed'
    },
    {
      link: ROUTES_DATA.PRIVATE.children.PROFILE.url,
      title: ROUTES_DATA.PRIVATE.children.PROFILE.title,
      icon: 'person'
    }
  ];
  ROUTES_DATA = ROUTES_DATA;
  loader$ = this.loaderService.getLoader$;
  currentUser$ = this.profileService.getCurrentUser();
  searchControl = new FormControl();
  filteredOptions$: Observable<IArticle[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    switchMap(search => this.articleService.searchArticle(search))
  );

  constructor(
    private authService: AuthService,
    public afs: AngularFirestore,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
  }

  trackByFn(index: number, article: IArticle) {
    return article.id;
  }

  signOut = () => this.authService.signOut();

}
