import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageSelector } from './shared/components/image-selector/image-selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-ui');
}
