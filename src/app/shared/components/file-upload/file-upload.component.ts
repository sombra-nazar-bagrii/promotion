import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from '../image-cropper';
import { SnackBarService, SNACK_BAR } from "@shared";

export interface IOutPutData {
  base64: string;
  fileToUpload: File;
}

@Component({
  selector: 'promo-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() openCropper = false;
  @Input() multiple = false;
  @Input() roundedCropper = false;
  @Input() acceptTypes = ['png', 'jpg', 'jpeg'];
  @Output() fileEvent = new EventEmitter<IOutPutData>();
  readonly fileSizeLimitMB = 1;

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  fileChangeEvent = (event) => this._handleFiles(event.target?.files ?? []);

  onFileDropped = (files) => this._handleFiles(files);

  private _handleFiles(files: File[]) {
    if (!files.length) return;

    const file = files[0];

    if (!this._validFileType(file)) return this.snackBarService.openErrorSnackBar(SNACK_BAR.error.invalid_file_type);
    if (!this._validFileSize(file)) return this.snackBarService.openErrorSnackBar(SNACK_BAR.error.invalid_file_size);

    if (file) this._manageImageCropper(file);
  }

  private _manageImageCropper(file: File) {
    const imageCropper = this.dialog.open(ImageCropperComponent, {
      maxWidth: '90vw',
      data: { image: file, rounded: this.roundedCropper },
    });

    imageCropper.afterClosed().subscribe((data) => {
      this.fileEvent.emit({
        base64: data.croppedImage || null,
        fileToUpload: data.file,
      });
      this.fileInput.nativeElement.value = '';
      this.changeDetectorRef.markForCheck();
    });
  }

  getInputAcceptTypes = () => this.acceptTypes.map(type => `image/${type}`).join(', ');
  getInputAcceptTypesForView = () => this.acceptTypes.map(type => `.${type}`).join(' ');

  private _validFileType = (file: File) => this.acceptTypes.some(type => file.type.endsWith(type))
  private _validFileSize = (file: File) => file.size < this.fileSizeLimitMB * 1_000_000;
}
