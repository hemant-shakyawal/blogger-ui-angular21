import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageSelector } from './shared/components/image-selector/image-selector';
import { Authservice } from './shared/services/authservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-ui');

  authService = inject(Authservice);
  loadUserRef = this.authService.loadUser();
  user=this.loadUserRef.value;

  effectRef=effect(() => {

const userValue=this.user()


    if(userValue){
   this.authService.user.set(userValue);
    }
  
  });
}
