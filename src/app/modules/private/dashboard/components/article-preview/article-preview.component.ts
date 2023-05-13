import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IArticle, getEnumPropNameByValue, ArticleCategory, ROUTES_DATA, SnackBarService, SNACK_BAR } from "@shared";
import { ArticleService } from "@modules/private/article/article.service";

@Component({
  selector: 'promo-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent implements OnInit {

  ROUTES_DATA = ROUTES_DATA;

  @Input() article: IArticle;
  @Input() currentUserId: string;

  constructor(
    private articleService: ArticleService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  getCategoryName = (category: ArticleCategory) => getEnumPropNameByValue(category, ArticleCategory);

  removeArticle = (id: string) => this.articleService.removeArticle(id)
    .subscribe(() => this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.article_deleted));
}
