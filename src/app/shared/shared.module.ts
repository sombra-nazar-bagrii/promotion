import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";

import { SnackBarComponent } from "./components/snack-bar";
import { InputComponent } from "./components/input";
import { ButtonComponent } from "./components/button";
import { DividerComponent } from "./components/divider";
import { IconComponent } from "./components/icon";
import { UserAvatarComponent } from "./components/user-avatar";
import { FileUploadComponent } from "./components/file-upload";
import { ImageCropperComponent } from "./components/image-cropper";
import { TextareaComponent } from "./components/textarea";
import { BackLinkComponent } from "./components/back-link";
import { AuthorInfoComponent } from "./components/author-info";
import { ProgressSpinnerComponent } from "./components/progress-spinner";
import { DndDirective, LetDirective } from "./directives";

const SHARED_COMPONENTS = [
  SnackBarComponent,
  InputComponent,
  ButtonComponent,
  DividerComponent,
  IconComponent,
  UserAvatarComponent,
  FileUploadComponent,
  ImageCropperComponent,
  TextareaComponent,
  BackLinkComponent,
  AuthorInfoComponent,
  ProgressSpinnerComponent
]

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
  MatRippleModule,
  MatSelectModule,
  MatCardModule,
  MatAutocompleteModule,
  MatTabsModule
];

export const SHARED_MODULES = [
  ReactiveFormsModule,
  FormsModule,
  NgSelectModule,
  NgxSkeletonLoaderModule,
];

@NgModule({
  declarations: [
    DndDirective,
    LetDirective,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ],
  imports: [
    CommonModule,
    ...MAT_MODULES,
    ...SHARED_MODULES,
    RouterModule,
    QuillModule,
    ImageCropperModule,
  ],
  exports: [
    DndDirective,
    LetDirective,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    ...SHARED_MODULES,
    ...MAT_MODULES,
  ],
})
export class SharedModule { }
