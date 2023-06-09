import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, ProfileService } from "@core";
import { Observable, startWith, switchMap, tap, filter } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl } from "@angular/forms";
import { IArticle, ROUTES_DATA, LoaderService, isUndefined } from "@shared";
import { ArticleService } from "@modules/private/article/article.service";
import { environment } from "@env";

@Component({
  selector: 'promo-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateLayoutComponent implements OnInit {

  version = environment.version;
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
  filteredOptions$: Observable<IArticle[]>;

  constructor(
    private authService: AuthService,
    public afs: AngularFirestore,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      filter(search => !isUndefined(search)),
      tap((c) => console.log(c)),
      switchMap(search => this.articleService.searchArticle(search))
    );
  }

  trackByFn(index: number, article: IArticle) {
    return article.id;
  }

  signOut = () => this.authService.signOut();

}
