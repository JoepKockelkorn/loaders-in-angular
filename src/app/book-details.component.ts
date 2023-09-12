import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  template: `<p>outlet for tabs, default tab is general</p>`,
  styles: [],
})
export default class BookDetailsComponent {}
