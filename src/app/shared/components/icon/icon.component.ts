import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalObjectService } from '@core';

@Component({
  selector: 'promo-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() icon!: string;
  @Input() color: ThemePalette;
  @Input() size: 'auto' | 'fit' | null = 'auto';
  @Input() fontSize = 24;

  private readonly defaultExtension = 'svg';
  private readonly baseUrl = 'assets/icons';

  constructor(
    readonly sanitizer: DomSanitizer,
    readonly registry: MatIconRegistry,
    readonly globalService: GlobalObjectService
  ) {}

  /*  ngOnChanges() {
      const name = this.icon;
      const baseIconUrl = `${this.baseUrl}/${name}`;

      const iconUrl = `${baseIconUrl}.${this.defaultExtension}`;
      const safeIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl(iconUrl);

      this.registry.addSvgIcon(name, safeIconUrl);
    }*/

  ngOnChanges() {
    const name = this.icon;

    const svgUrl = `${this.baseUrl}/${name}.${this.defaultExtension}`;
    const domain = this.globalService.isPlatformBrowser() ? '' : 'http://localhost:4200/';
    const safeIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl(domain + svgUrl);
    this.registry.addSvgIcon(name, safeIconUrl);
  }
}
