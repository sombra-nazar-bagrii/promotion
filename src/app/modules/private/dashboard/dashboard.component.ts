import { ChangeDetectionStrategy, Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule, ArticleCategory, ROUTES_DATA, IArticle, isNil } from "@shared";
import { RouterModule } from "@angular/router";
import { DASHBOARD_COMPONENTS } from "./components";
import { BehaviorSubject, Observable, combineLatest, switchMap, distinctUntilChanged } from "rxjs";
import { ArticleService } from "@modules/private/article/article.service";
import { ProfileService } from "@core";
import { trigger, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'promo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('articleAnimation', [
      transition(':leave', [
        animate(
          400,
          style({
            opacity: 0,
            height: 0,
          })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  loadMoreCount = 10;
  showCount$ = new BehaviorSubject<number>(10);
  category$ = new BehaviorSubject<ArticleCategory | null>(null);
  sorting$ = new BehaviorSubject<boolean>(false);
  ROUTES_DATA = ROUTES_DATA;

  currentUser$ = this.profileService.getCurrentUser();
  articles$: Observable<IArticle[]> = combineLatest([
    this.category$,
    this.sorting$,
    this.showCount$
  ]).pipe(
    distinctUntilChanged(),
    switchMap(([category, sort, count]) => this.articleService.getArticles(
        sort ? 'asc' : 'desc',
        'createdAt',
        count,
        isNil(category) ? undefined :
          {
            prop: 'category',
            operator: '==',
            value: category
          }
      )
    ),
  )

  constructor(
    private articleService: ArticleService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {}

  trackByFn(index: number, article: IArticle) {
    return article.id;
  }

}


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  declarations: [
    DashboardComponent,
    ...DASHBOARD_COMPONENTS
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {
}
