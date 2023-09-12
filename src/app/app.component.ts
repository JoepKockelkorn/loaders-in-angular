import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationCancel,
  NavigationCancellationCode,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  #authService = inject(AuthService);
  #router = inject(Router);
  protected user$ = this.#authService.user$;

  ngOnInit() {
    this.#router.events.subscribe((event) => {
      if (
        event instanceof NavigationCancel &&
        event.code === NavigationCancellationCode.NoDataFromResolver
      ) {
        this.#router.navigateByUrl('/404');
      }
    });
  }

  logout() {
    this.#authService.logout();
    this.#router.navigateByUrl('/');
  }
}
