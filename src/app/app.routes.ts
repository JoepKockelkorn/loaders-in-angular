import { Routes } from '@angular/router';

export const routes: Routes = [
  // /                        HomeComponent (button to login)
  // /login                   LoginComponent (redirect to overview or to the url that was requested before login)
  // /books                   BooksComponent (list of data, filters, pagination, etc)
  // /books/:bookId           DetailComponent (outlet for tabs, default tab is general)
  // /books/:bookId/general   DetailGeneralComponent
  // /books/:bookId/admin     DetailAdminComponent
  // /404                     NotFoundComponent (in case of 404, replace the url)
];
