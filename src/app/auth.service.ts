import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, timer } from 'rxjs';

export interface User {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  #user$ = new BehaviorSubject<User | 'logged out'>(getSessionUser());

  get user$() {
    return this.#user$.asObservable();
  }

  login() {
    return timer(500).pipe(
      tap(() => {
        const user = { name: 'Joep Kockelkorn' };
        this.#user$.next(user);
        setSessionUser(user);
      }),
    );
  }

  logout() {
    this.#user$.next('logged out');
    setSessionUser('logged out');
  }
}

function setSessionUser(user: User | 'logged out') {
  if (user === 'logged out') {
    sessionStorage.removeItem('user');
    return;
  }
  sessionStorage.setItem('user', JSON.stringify(user));
}

function getSessionUser(): User | 'logged out' {
  const sessionUser = sessionStorage.getItem('user');
  if (!sessionUser) {
    console.log('no user in session');
    return 'logged out';
  }
  const user = JSON.parse(sessionUser);
  console.log('user in session', user);
  return user;
}
