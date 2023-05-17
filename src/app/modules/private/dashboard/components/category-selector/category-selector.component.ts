import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleCategory } from "@shared";

@Component({
  selector: 'promo-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectorComponent implements OnInit {

  @Output() onCategoryChange = new EventEmitter<ArticleCategory | null>()

  allCategoryOption = {
    id: null,
    name: 'All categories'
  };
  selectedCategory: string;
  categoryOptions: { id: ArticleCategory, name: string }[] = Object.keys(ArticleCategory)
    .filter(key => !isNaN(Number(ArticleCategory[key])))
    .map(key => ({ id: ArticleCategory[key], name: key })
    );

  constructor() { }

  ngOnInit(): void {
    this.selectedCategory = this.allCategoryOption.name;
  }

  selectionChange(category: { id: ArticleCategory, name: string }) {
    this.selectedCategory = category.name;
    this.onCategoryChange.emit(category.id);
  }
}
