import { Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../../shared/services/authservice';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  sidebarOpen = signal(true);
  authService = inject(Authservice);
  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  onLogout() {
    this.authService.logout();
  }
}
