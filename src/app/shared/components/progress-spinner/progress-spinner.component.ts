import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'promo-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() color: ThemePalette = 'primary';
  @Input() display!: boolean | null;

  constructor() {}

  ngOnInit(): void {}
}
