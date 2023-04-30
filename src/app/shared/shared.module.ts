import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from './directives';
import { SHARED_PIPES } from './pipes';

import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { RouterModule } from "@angular/router";
import { ImageCropperModule } from "ngx-image-cropper";
import { QuillModule } from "ngx-quill";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatSidenavModule } from "@angular/material/sidenav";

export const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSidenavModule,
];

export const SHARED_MODULES = [
  ReactiveFormsModule,
  FormsModule,
  NgSelectModule,
  NgxSkeletonLoaderModule,
];

@NgModule({
  declarations: [...SHARED_DIRECTIVES, ...SHARED_COMPONENTS, ...SHARED_PIPES],
  imports: [
    CommonModule,
    ...MAT_MODULES,
    ...SHARED_MODULES,
    RouterModule,
    QuillModule,
    ImageCropperModule,
  ],
  exports: [
    ...SHARED_DIRECTIVES,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    ...SHARED_MODULES,
    ...MAT_MODULES,
  ],
})
export class SharedModule { }
