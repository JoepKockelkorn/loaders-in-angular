import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'always' }), withComponentInputBinding(), withPreloading(PreloadAllModules))],
};
