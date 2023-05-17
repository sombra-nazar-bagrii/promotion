import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from "rxjs";
import { IUser, LoaderService } from "@shared";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) { }

  getUserById(userId: string): Observable<IUser> {
    return this.angularFirestore.doc<IUser>(`users/${userId}`).valueChanges();
  }

  updateUserData(userId: string, data: Partial<IUser>): Observable<void> {
    return from(this.angularFirestore.doc(`users/${userId}`).update(data));
  }

  uploadUserAvatar(file: File, userId: string): Observable<void> {
    const filePath = `userAvatar/${userId}`;
    const fileRef = this.angularFireStorage.ref(filePath);
    const task = fileRef.put(file);
    return from(task.then()).pipe(
      switchMap(() => fileRef.getDownloadURL()),
      switchMap(photoURL => this.updateUserData(userId, {photoURL}))
    )
  }

}
