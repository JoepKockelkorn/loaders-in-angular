import { ResolveFn } from '@angular/router';

export type Resolved<T> = T extends ResolveFn<infer R> ? R : never;
