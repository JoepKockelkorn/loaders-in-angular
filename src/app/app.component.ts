import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationCancellationCode, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs';

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
  protected isLoading$ = this.#router.events.pipe(
    filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError),
    map((e) => e instanceof NavigationStart),
  );

  ngOnInit() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationCancel && event.code === NavigationCancellationCode.NoDataFromResolver) {
        this.#router.navigateByUrl('/404', { replaceUrl: true });
      }
    });
  }

  logout() {
    this.#authService.logout();
    this.#router.navigateByUrl('/');
  }
}
