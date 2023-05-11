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
import { SnackBarComponent } from '../snack-bar';
import { ISnackBarConf } from '../../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

export interface IOutPutData {
  base64: string;
  fileToUpload: any;
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
  @Output() fileEvent = new EventEmitter<IOutPutData>();
  readonly fileSizeLimitMB = 1;
  invalidFiles: string[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  fileChangeEvent = (event: any) => this._handleFiles(event.target?.files ?? []);

  onFileDropped = (files) => this._handleFiles(files);

  private _handleFiles(files: File[]) {
    if (!files.length) return;
    if (this.openCropper) {
      const file = Object.values(files).filter(
        ({ type }) => type.startsWith('image') && !type.endsWith('svg+xml')
      )?.[0];
      if (file) this._manageImageCropper(file);
    } else {
      Array.from(files).forEach((file: File) =>
        this._validateTypeAndSize(file)
          ? this._handleUpload(file)
          : this.invalidFiles.push(file.name)
      );
    }

    this.invalidFiles.length && this._showValidationError(this.invalidFiles.join(', '));
    this.invalidFiles = [];
  }

  private _manageImageCropper(file: File) {
    const imageCropper = this.dialog.open(ImageCropperComponent, {
      maxWidth: '90vw',
      data: { image: file, rounded: this.roundedCropper },
    });
    imageCropper.afterClosed().subscribe((data: any) => {
      this.fileEvent.emit({
        base64: data.croppedImage || null,
        fileToUpload: data.file,
      });
      this.fileInput.nativeElement.value = '';
      this.changeDetectorRef.markForCheck();
    });
  }

  private _validateTypeAndSize = (file: any) => file.size < this.fileSizeLimitMB * 1_000_000;

  private _showValidationError = (fileNames: string) =>
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 10_000,
      horizontalPosition: 'right',
      panelClass: [`snack-error`],
      data: {
        title: 'files.validation.title',
        message: fileNames,
        icon: 'error',
      } as ISnackBarConf,
    });

  private _handleUpload(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileEvent.emit({
        base64: (reader.result as any) || null,
        fileToUpload: file,
      });
    };
  }
}
