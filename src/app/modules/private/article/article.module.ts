import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ARTICLE_PAGES } from "./pages";
import { SharedModule } from "@shared";

@NgModule({
  declarations: [
    ...ARTICLE_PAGES,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
