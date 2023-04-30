import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'promo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: ThemePalette = 'primary';
  @Input() variant: 'flat' | 'link' | 'icon' | 'stroked';
  @Input() @HostBinding('attr.disabled') disabled = false;
}
