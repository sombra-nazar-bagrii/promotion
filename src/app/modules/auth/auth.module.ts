import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_COMPONENTS } from './pages';
import { SharedModule } from "@shared";
import { AuthLayoutComponent } from "./layout";

@NgModule({
  declarations: [
    AuthLayoutComponent,
    ...AUTH_COMPONENTS
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
