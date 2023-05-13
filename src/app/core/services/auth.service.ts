import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  IUser,
  ROUTES_DATA,
  IUserRegistration,
  SnackBarService,
  SNACK_BAR,
  plainDeleteNullableValues,
  LoaderService,
  FirebaseErrorResponse
} from "@shared";
import { switchMap, from, mergeMap, tap } from "rxjs";
import { ProfileService } from "./profile.service";
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
    private snackBarService: SnackBarService,
    private loaderService: LoaderService
  ) {
  }

  signIn({ email, password }: Partial<IUserRegistration>) {
    this.loaderService.setLoaderStatus(true);
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
        this.loaderService.setLoaderStatus(false);
        throw new FirebaseErrorResponse(error);
      })
    ).pipe(
      switchMap(() => this.profileService.invokeUserProfile()),
    ).subscribe(user => {
      this.loaderService.setLoaderStatus(false);
      if (user) {
        this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url])
      }
    })
  }

  signUp(userDetails: IUserRegistration) {
    this.loaderService.setLoaderStatus(true);
    from(this.afAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .catch(error => {
        this.loaderService.setLoaderStatus(false);
        throw new FirebaseErrorResponse(error)
      })
    ).pipe(
      mergeMap(result => [
        result.user.sendEmailVerification(),
        this.setUserData(result.user, userDetails)
      ]),
    ).subscribe(() => {
      this.loaderService.setLoaderStatus(false);
      this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.account_created);
      this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url])
    });
  }

  forgotPassword(passwordResetEmail: string) {
    this.loaderService.setLoaderStatus(true);
    return from(this.afAuth.sendPasswordResetEmail(passwordResetEmail).catch(error => {
      this.loaderService.setLoaderStatus(false);
      throw new FirebaseErrorResponse(error);
    })).subscribe(() => {
      this.loaderService.setLoaderStatus(false);
      this.snackBarService.openSuccessSnackBar(SNACK_BAR.success.password_change_request)
    });
  }

  googleAuth = () => this.authLogin(new auth.GoogleAuthProvider());
  fbAuth = () => this.authLogin(new auth.FacebookAuthProvider());

  private authLogin(provider: AuthProvider) {
    this.loaderService.setLoaderStatus(true);
    from(this.afAuth.signInWithPopup(provider).catch(error => {
      this.loaderService.setLoaderStatus(false);
      throw new FirebaseErrorResponse(error);
    })).pipe(
      switchMap(user => this.setUserData(user.user)),
      switchMap(() => this.profileService.invokeUserProfile()),
    ).subscribe(user => {
      this.loaderService.setLoaderStatus(false);
      if (user) {
        this.router.navigate([ROUTES_DATA.PRIVATE.children.DASHBOARD.url])
      }
    })
  }

  private setUserData(user: any, userDetails?: IUserRegistration) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Partial<IUser> = plainDeleteNullableValues({
      uid: user.uid,
      email: user?.email || userDetails?.email,
      age: user?.age || userDetails?.age,
      userName: user?.displayName || userDetails?.displayName,
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

  changePassword(newPassword: string) {
    this.loaderService.setLoaderStatus(true);
    return from(this.afAuth.currentUser).pipe(
      mergeMap((user) => user.updatePassword(newPassword).catch(error => {
        this.loaderService.setLoaderStatus(false);
        throw new FirebaseErrorResponse(error);
      })),
      tap(() => this.loaderService.setLoaderStatus(false))
    );
  }

}
