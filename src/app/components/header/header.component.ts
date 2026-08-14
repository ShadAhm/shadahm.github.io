import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public navbarCollapsed = true;

  toggleNav(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  closeNav(): void {
    this.navbarCollapsed = true;
  }
}
