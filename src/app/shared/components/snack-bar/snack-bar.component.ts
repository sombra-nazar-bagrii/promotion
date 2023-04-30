import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ISnackBarConf } from '../../interfaces';

@Component({
  selector: 'uzhosts-snackbar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  // configs!: ISnackBarConf;
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarConf
  ) {}

  ngOnInit(): void {
    // this.configs = this.data;
  }

  closeSnackBar() {
    this.snackBarRef.dismiss();
  }
}
