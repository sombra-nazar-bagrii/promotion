import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { deepFind, SnackBarService, SNACK_BAR } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private snackBarService: SnackBarService,
    private zone: NgZone,
  ) {
  }

  // handle error and show snackbar with message
  handleError(error) {
    if (error?.errorCode) {
      this.zone.run(() => {
        try {
          this.snackBarService.openErrorSnackBar(deepFind(SNACK_BAR.error, error.errorCode));
        } catch (e) {
          this.snackBarService.openErrorSnackBar(SNACK_BAR.error.SERVER_ERROR);
        }
      });
    }
    console.error(error);
  }
}
