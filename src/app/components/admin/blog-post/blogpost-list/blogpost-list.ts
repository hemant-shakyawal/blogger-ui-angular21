import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.scss',
})
export class BlogpostList {

}
