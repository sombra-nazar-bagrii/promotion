import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'promo-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent {
  croppedImage: any = '';
  file: any = '';

  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: File; rounded: boolean }
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.file = base64ToFile(event.base64 as any);
  }
}
