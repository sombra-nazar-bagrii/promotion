import { Injectable } from '@angular/core';
import { BehaviorSubject, take, Observable, catchError, of, map, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { IUser } from "@shared";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  currentUser$ = new BehaviorSubject<IUser>(null);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
  }

  invokeUserProfile(): Observable<IUser> {
    return this.angularFireAuth.authState.pipe(
      switchMap(user => this.angularFirestore.doc<IUser>(`users/${user.uid}`).get()),
      map(resp => resp.data()),
      tap(current => this.setCurrentUser(current)),
      take(1),
      catchError(() => {
        this.clearUserProfile();
        return of(null);
      })
    );
  }

  setCurrentUser(userData: IUser | null = null) {
    this.currentUser$.next(userData);
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUser$.asObservable();
  }

  clearUserProfile() {
    this.currentUser$.next(null);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.angularFirestore.doc<IUser>(`users/${userId}`).valueChanges();
  }
}
