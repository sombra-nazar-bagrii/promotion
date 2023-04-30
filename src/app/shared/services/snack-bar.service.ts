import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISnackBarConf, IKeyValue } from "../interfaces";
import { SnackBarComponent } from "../components";

type snackBarTypes = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  // open snackbar with success state
  openSuccessSnackBar(data: IKeyValue<string, string>) {
    this.openSnackBar('success', data.key, data.value);
  }

  // open snackbar with error state
  openErrorSnackBar(data: IKeyValue<string, string>) {
    this.openSnackBar('error', data.key, data.value);
  }

  // open snackbar with info state
  openInfoSnackBar(data: IKeyValue<string, string>) {
    this.openSnackBar('info', data.key, data.value);
  }

  // configuration and show snackbar
  openSnackBar(type: snackBarTypes, title: string, message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 10_000,
      horizontalPosition: 'right',
      panelClass: [`snack-${type}`],
      data: {
        title,
        message,
        icon: type,
      } as ISnackBarConf,
    });
  }
}
