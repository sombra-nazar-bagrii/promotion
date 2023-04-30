import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from "@shared";
import { PrivateLayoutComponent } from './layout/private-layout.component';


@NgModule({
  declarations: [
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
