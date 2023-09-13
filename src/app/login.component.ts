import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { map, tap, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `<button (click)="login()">Login</button>`,
  styles: [],
})
export default class LoginComponent {
  #authService = inject(AuthService);
  #redirect = inject(ActivatedRoute).queryParamMap.pipe(map((qp) => qp.get('redirect') || '/'));
  #router = inject(Router);

  login() {
    this.#authService
      .login()
      .pipe(
        withLatestFrom(this.#redirect),
        tap(([_, redirect]) => this.#router.navigateByUrl(redirect)),
      )
      .subscribe();
  }
}
