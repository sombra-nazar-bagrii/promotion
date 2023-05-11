import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'promo-wether-widget',
  templateUrl: './wether-widget.component.html',
  styleUrls: ['./wether-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WetherWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
