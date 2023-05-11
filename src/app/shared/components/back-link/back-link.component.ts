import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'promo-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackLinkComponent implements OnInit {

  @Input() link: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
