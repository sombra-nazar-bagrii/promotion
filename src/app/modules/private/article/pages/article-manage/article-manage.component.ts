import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { tap, switchMap, of, Observable, EMPTY, combineLatest } from "rxjs";
import { IArticle, SnackBarService, SNACK_BAR, ROUTES_DATA, ArticleCategory } from "@shared";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IOutPutData } from "../../../../../shared/components/file-upload";
import { ArticleService } from "../../article.service";
import { ProfileService } from "@core";

@Component({
  selector: 'promo-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleManageComponent implements OnInit {

  private _id: string;
  articleForm: FormGroup;
  coverPhoto: IOutPutData;
  newArticle: boolean;
  photoPreview: string;
  authorId: string;
  categoryOptions: { id: ArticleCategory, name: string }[] = Object.keys(ArticleCategory)
    .filter(key => !isNaN(Number(ArticleCategory[key])))
    .map(key => {
      return {
        id: ArticleCategory[key],
        name: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
      };
    });

  article$: Observable<IArticle> = combineLatest([
    this.activatedRoute.params,
    this.profileService.getCurrentUser()
  ]).pipe(
    switchMap(([params, user]) => {
      const articleId = params?.id;
      if (!articleId || !user) {
        this._redirectToTheDashboard();
        return EMPTY;
      }
      this.authorId = user.uid;
      this._id = articleId;
      this.newArticle = articleId === 'new';
      return this.newArticle ? of({} as IArticle) : this.articleService.getArticleById(articleId)
    }),
    tap((article) => {
      if (!this.newArticle) {
        this.photoPreview = article.coverPhoto;
      }
      this._buildFrom(article)
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private snackBarService: SnackBarService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  _buildFrom(article?: IArticle) {
    this.articleForm = this.fb.group({
      title: [article?.title ?? '', Validators.required],
      category: [article?.category || ArticleCategory.Art, Validators.required],
      body: [article?.body ?? '', Validators.required],
    })
  }

  onCoverPhotoUpload(file: IOutPutData, newArticle = false) {
    if (newArticle) {
      this.coverPhoto = file;
    } else {
      this.articleService.addPhotoToTheStorage(file?.fileToUpload, this._id).pipe(
        switchMap((coverPhoto) => this.articleService.updateArticle(this._id, {
          coverPhoto,
          updatedAt: new Date().toISOString()
        }))
      ).subscribe(() => {
        this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.article_updated);
        this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);
      });
    }

    this.photoPreview = file?.base64;
  }

  publishArticle() {
    if (this.newArticle) {
      this.articleService.createArticle({
        ...this.articleForm.value,
        createdAt: new Date().toISOString(),
        authorId: this.authorId
      }, this.coverPhoto.fileToUpload)
        .subscribe(() => {
          this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.article_created);
          this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);
        })
    } else {
      this.articleService.updateArticle(this._id, { ...this.articleForm.value, updatedAt: new Date().toISOString() })
        .subscribe(() => {
          this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.article_updated);
          this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);
        })
    }
  }

  private _redirectToTheDashboard = () => this.router.navigate(['/', ROUTES_DATA.PRIVATE.children.DASHBOARD.url]);
}
