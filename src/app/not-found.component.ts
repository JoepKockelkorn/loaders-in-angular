import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `Ooooops, not found 😱`,
  styles: [],
})
export default class NotFoundComponent {}
