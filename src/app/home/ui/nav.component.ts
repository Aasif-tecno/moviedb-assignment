import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-nav',
  template: `
    <nav>
      <div class="menu-icon"></div>
      <div class="logo">MovieDB</div>
      <div class="nav-items">
        <li><a>Home</a></li>
      </div>
      <button class="logout" (click)="signOut()">Logout</button>
    </nav>
  `,
})
export default class NavComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  signOut() {
    this._authService.signOut().subscribe((resp) => {
      console.log('LogedOUt', resp);
      this._router.navigate(['sign-in']);
    });
  }
}
