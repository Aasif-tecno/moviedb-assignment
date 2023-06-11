import { Component, effect, inject, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-nav',
  template: `
    <nav>
      <div class="menu-icon"></div>
      <div class="logo">MovieDB</div>
      <div class="nav-items">
        <li><a href="#">Home</a></li>
      </div>
      <a>Logout</a>
    </nav>
  `,
})
export default class NavComponent {
  constructor() {}
}
