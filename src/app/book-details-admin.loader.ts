import { ActivatedRouteSnapshot } from '@angular/router';
import { filter, map, of } from 'rxjs';
import { loader as bookLoader } from './book-details.loader';
import { Resolved } from './types';

export const loader = (route: ActivatedRouteSnapshot) => {
  return of(route.parent?.data).pipe(
    map((data) => (data!['book'] as Resolved<typeof bookLoader>).isAdmin ?? false),
    filter(Boolean),
  );
};
