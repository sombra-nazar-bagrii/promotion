import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IArticle, getEnumPropNameByValue, ArticleCategory } from "@shared";

@Component({
  selector: 'promo-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit(): void {
  }

  getCategoryName = (category: ArticleCategory) => getEnumPropNameByValue(category, ArticleCategory);

  getDisplayDate(publishDate: string): string {
    const today = new Date();
    const publishFormattedDate = new Date(publishDate)
    const daysAgo = Math.floor((today.getTime() - publishFormattedDate.getTime()) / (1000 * 3600 * 24));

    if (daysAgo === 0) {
      return "today";
    } else if (daysAgo <= 20) {
      return `${daysAgo} days ago`;
    } else {
      return publishFormattedDate.toISOString();
    }
  }

}
