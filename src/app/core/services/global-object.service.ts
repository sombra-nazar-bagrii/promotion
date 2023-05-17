import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalObjectService {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  // check if we use browser
  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  getWindow(): Window | null {
    if (this.isPlatformBrowser()) {
      return this.doc.defaultView;
    }
    return null;
  }

  getLocation(): Location {
    if (this.isPlatformBrowser()) {
      return this.doc.location;
    }
    return null;
  }

  /*createElement(tag: string): HTMLElement {
    if (this.isPlatformBrowser()) {
      return this.doc.createElement(tag);
    }
    return null;
  }*/

  scrollPageToTop() {
    if (this.isPlatformBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

}
