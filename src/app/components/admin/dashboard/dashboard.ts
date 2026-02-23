import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  sidebarOpen = signal(true);

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}
