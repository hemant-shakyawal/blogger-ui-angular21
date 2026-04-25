import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-header',
  imports: [ RouterModule,],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(Authservice);

}
