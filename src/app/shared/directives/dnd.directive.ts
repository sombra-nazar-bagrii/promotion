import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[uiDnd]',
})
export class DndDirective {
  @HostBinding('class.active') fileInner: boolean;
  @Input() disabled = false;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.disabled) {
      this.fileInner = true;
    }
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.disabled) {
      this.fileInner = false;
    }
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.disabled) {
      this.fileInner = false;

      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }
}
