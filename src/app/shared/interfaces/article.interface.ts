import { ArticleCategory } from "../enums";

export interface IArticle {
  coverPhoto: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  category: ArticleCategory;
  id: string;
}
