import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_DATA, AuthImageType } from "@shared";
import { SignInComponent, SignUpComponent, PasswordResetComponent } from "./pages";
import { AuthLayoutComponent } from "@modules/auth/layout";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: ROUTES_DATA.AUTH.children.SIGN_IN.url,
        component: SignInComponent,
        title: 'Login into account',
        data: {
          imageType: AuthImageType.SignIn
        }
      },
      {
        path: ROUTES_DATA.AUTH.children.SIGN_UP.url,
        component: SignUpComponent,
        title: 'Create a new account',
        data: {
          imageType: AuthImageType.SignUp
        }
      },
      {
        path: ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.url,
        component: PasswordResetComponent,
        title: 'Reset password',
        data: {
          imageType: AuthImageType.PasswordReset
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
