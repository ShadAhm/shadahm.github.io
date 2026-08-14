import { Component, Input } from '@angular/core';

/**
 * Icon names available to templates. Add a new name here and a matching
 * `*ngSwitchCase` block in icon.component.html — see the file header there.
 */
export type IconName =
  | 'arrow-up'
  | 'briefcase'
  | 'chevron-right'
  | 'code'
  | 'external-link'
  | 'file-text'
  | 'git-branch'
  | 'github'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'printer'
  | 'star'
  | 'x';

/**
 * Inline SVG icon. Colour follows the surrounding text (`stroke="currentColor"`),
 * so tint it with a text colour class on the host: `<app-icon name="star" class="text-accent">`.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 16;
}
