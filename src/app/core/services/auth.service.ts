import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IUser, ROUTES_DATA, IUserRegistration } from "@shared";
import { switchMap, from, tap, mergeMap } from "rxjs";
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
    private profileService: ProfileService
  ) {
  }

  signIn({ email, password }: { email: string, password: string }) {
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
        this.setUserData(result.user, userDetails)
      ]),
    ).subscribe();

/*    return this.afAuth
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user, userDetails);
      })
      .catch((error) => {
        window.alert(error.message);
      });*/
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

/*  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  authLogin(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }*/

  setUserData(user: any, userDetails: IUserRegistration) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Partial<IUser> = {
      uid: user.uid,
      email: user.email,
      age: userDetails.age,
      userName: userDetails.name,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut = () => from(this.afAuth.signOut()).pipe(
    tap(() => this.router.navigate(['../', ROUTES_DATA.AUTH.children.SIGN_IN.url]))
  ).subscribe()

}
