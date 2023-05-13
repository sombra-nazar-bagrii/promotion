import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, from, switchMap, map, tap } from "rxjs";
import { IArticle, ArticleCategory, LoaderService } from "@shared";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import { AngularFireStorage } from "@angular/fire/compat/storage";
import OrderByDirection = firebase.firestore.OrderByDirection;

type WhereQueryType = {
  prop: string;
  operator: WhereFilterOp;
  value: ArticleCategory
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    public afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private loaderService: LoaderService
  ) {
  }

  createArticle(article: Partial<IArticle>, file: any): Observable<unknown> {
    return from(this.afs.collection<Partial<IArticle>>('article').add(article)).pipe(
      switchMap(resp => this.addPhotoToTheStorage(file, resp.id).pipe(
        map(photoUrl => ({ resp, photoUrl }))
      )),
      switchMap(({ resp, photoUrl }) => this.updateArticle(resp.id, { id: resp.id, coverPhoto: photoUrl })),
    );
  }

  getArticles(
    orderRule: OrderByDirection = 'asc',
    orderBy = 'createdAt',
    limit = 10,
    where?: WhereQueryType
  ): Observable<IArticle[]> {
    this.loaderService.setLoaderStatus(true);
    return this.afs.collection<IArticle>(
      'article',
      ref => where ?
        ref.orderBy(orderBy, orderRule).limit(limit)
          .where(where.prop, where.operator, where.value) :
        ref.orderBy(orderBy, orderRule).limit(limit)
    ).valueChanges().pipe(
      tap(() => this.loaderService.setLoaderStatus(false))
    )
  }

  searchArticle(search: string): Observable<IArticle[]> {
    const query = this.afs.collection<IArticle>(
      'article',
      ref => ref.where('title', '>=', search).where('title', '<=', `${search}\uf8ff`));
    return query.valueChanges();
  }

  getArticleById(articleId: string): Observable<IArticle> {
    this.loaderService.setLoaderStatus(true);
    return this.afs.doc<IArticle>(`article/${articleId}`).valueChanges().pipe(
      tap(() => this.loaderService.setLoaderStatus(false))
    );
  }

  updateArticle(articleId: string, article: Partial<IArticle>) {
    return from(this.afs.doc(`article/${articleId}`).update(article));
  }

  removeArticle(articleId: string) {
    this.loaderService.setLoaderStatus(true);
    return from(this.afs.doc(`article/${articleId}`).delete()).pipe(
      tap(() => this.loaderService.setLoaderStatus(false))
    )
  }

  addPhotoToTheStorage(file: File, article_id: string | number): Observable<string> {
    const filePath = `coverPhotos/${article_id}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = fileRef.put(file);
    return from(task.then()).pipe(
      switchMap(() => fileRef.getDownloadURL())
    )
  }


}
