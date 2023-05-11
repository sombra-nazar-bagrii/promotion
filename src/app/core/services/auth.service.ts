import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IUser, ROUTES_DATA, IUserRegistration, SnackBarService, SNACK_BAR, plainDeleteNullableValues } from "@shared";
import { switchMap, from, mergeMap } from "rxjs";
import { ProfileService } from "./profile.service";
import { FirebaseErrorResponse } from "../../shared/models";
import firebase from "firebase/compat";
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private profileService: ProfileService,
    private snackBarService: SnackBarService
  ) {
  }

  signIn({ email, password }: Partial<IUserRegistration>) {
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
        throw new FirebaseErrorResponse(error);
      })
    ).pipe(
      switchMap(() => this.profileService.invokeUserProfile()),
    ).subscribe(user => {
      if (user) {
        this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url])
      }
    })
  }

  signUp(userDetails: IUserRegistration) {
    from(this.afAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .catch(error => {
        throw new FirebaseErrorResponse(error)
      })
    ).pipe(
      mergeMap(result => [
        result.user.sendEmailVerification(),
        this.setUserData({ ...result.user, ...userDetails })
      ]),
    ).subscribe(() => {
      this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.account_created);
      this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url])
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.password_change_request))
      .catch(error => {
        throw new FirebaseErrorResponse(error);
      });
  }

  googleAuth = () => this.authLogin(new auth.GoogleAuthProvider());
  fbAuth = () => this.authLogin(new auth.FacebookAuthProvider());

  private authLogin(provider: AuthProvider) {
    from(this.afAuth.signInWithPopup(provider).catch(error => {
      throw new FirebaseErrorResponse(error);
    })).pipe(
      switchMap(user => this.setUserData(user.user)),
      switchMap(() => this.profileService.invokeUserProfile()),
    ).subscribe(user => {
      if (user) {
        this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url])
      }
    })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Partial<IUser> = plainDeleteNullableValues({
      uid: user.uid,
      email: user.email,
      age: user?.age,
      userName: user.displayName,
      photoURL: user?.photoURL,
    });
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut = () => this.afAuth.signOut().then(() => {
    this.router.navigate(['../', ROUTES_DATA.AUTH.children.SIGN_IN.url]);
    this.profileService.clearUserProfile();
  })

}
