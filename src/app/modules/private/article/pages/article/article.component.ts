import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArticleService } from "../../article.service";
import { switchMap, EMPTY } from "rxjs";
import { ROUTES_DATA } from "@shared";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "@core";

@Component({
  selector: 'promo-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {

  private _id: string;
  ROUTES_DATA = ROUTES_DATA;

  article$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const articleId = params?.id;
      if (!articleId) {
        this._redirectToTheDashboard();
        return EMPTY;
      }
      this._id = articleId;
      return this.articleService.getArticleById(articleId)
    })
  );

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  private _redirectToTheDashboard = () => this.router.navigate(['/', ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);


}
