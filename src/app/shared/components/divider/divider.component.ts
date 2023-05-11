import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'promo-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
