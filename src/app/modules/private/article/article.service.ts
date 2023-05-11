import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, from, switchMap, map } from "rxjs";
import { IArticle, ArticleCategory } from "@shared";
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
    private afStorage: AngularFireStorage
  ) {
  }

  createArticle(article: Partial<IArticle>, file: any): Observable<unknown> {
    return from(this.afs.collection<Partial<IArticle>>('article').add(article)).pipe(
      switchMap(resp => this.addPhotoToTheStorage(file, resp.id).pipe(
        map(photoUrl => ({ resp, photoUrl }))
      )),
      switchMap(({ resp, photoUrl }) => this.updateArticle(resp.id, { id: resp.id, coverPhoto: photoUrl }))
    );
  }

  getArticles(
    orderRule: OrderByDirection = 'asc',
    orderBy = 'createdAt',
    limit = 10,
    where?: WhereQueryType
  ): Observable<IArticle[]> {
    return this.afs.collection<IArticle>(
      'article',
      ref => where ?
        ref.orderBy(orderBy, orderRule).limit(limit)
          .where(where.prop, where.operator, where.value) :
        ref.orderBy(orderBy, orderRule).limit(limit)
    ).valueChanges()
  }

  getArticleById(articleId: string): Observable<IArticle> {
    return this.afs.doc<IArticle>(`article/${articleId}`).valueChanges();
  }

  updateArticle(articleId: string, article: Partial<IArticle>) {
    return from(this.afs.doc(`article/${articleId}`).update(article))
  }

  removeArticle() {

  }

  addPhotoToTheStorage(file: any, article_id: string | number): Observable<string> {
    const filePath = `coverPhotos/${article_id}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = fileRef.put(file);
    return from(task.then()).pipe(
      switchMap(() => fileRef.getDownloadURL())
    )
  }


}
