import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="user$ | async as user">
      <h1>Welcome!</h1>

      <a *ngIf="user === 'logged out'" [routerLink]="['/', 'login']">Login</a>
    </ng-container>
  `,
  styles: [],
})
export default class HomeComponent {
  protected user$ = inject(AuthService).user$;
}
