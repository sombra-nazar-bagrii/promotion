import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from "@angular/material/snack-bar";

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBarMock: MatSnackBar;

  beforeEach(() => {
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    });

    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a success snackbar with the provided data', () => {
    const data = { key: 'Success', value: 'Operation successful' };
    service.openSuccessSnackBar(data);

    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 10000,
      horizontalPosition: 'right',
      panelClass: ['snack-success'],
      data: {
        title: data.key,
        message: data.value,
        icon: 'success',
      }
    });
  });

  it('should open an error snackbar with the provided data', () => {
    const data = { key: 'Error', value: 'An error occurred' };
    service.openErrorSnackBar(data);

    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 10000,
      horizontalPosition: 'right',
      panelClass: ['snack-error'],
      data: {
        title: data.key,
        message: data.value,
        icon: 'error',
      }
    });
  });

  it('should open an info snackbar with the provided data', () => {
    const data = { key: 'Info', value: 'Some information' };
    service.openInfoSnackBar(data);

    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 10000,
      horizontalPosition: 'right',
      panelClass: ['snack-info'],
      data: {
        title: data.key,
        message: data.value,
        icon: 'info',
      }
    });
  });
});
