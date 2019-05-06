import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public navbarCollapsed: boolean;

  constructor() { }

  ngOnInit() {
    this.navbarCollapsed = true;
  }

  toggleNav(): void {
    this.navbarCollapsed = !this.navbarCollapsed; 
  }
}
