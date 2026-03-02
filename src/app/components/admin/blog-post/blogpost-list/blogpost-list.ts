import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Blogpostservice } from '../../../../shared/services/blogpostservice';

@Component({
  selector: 'app-blogpost-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.scss',
})
export class BlogpostList {
  private blogpostService = inject(Blogpostservice);
  private getAllBlogpostsRef = this.blogpostService.getAllBlogposts();
  isLodading = this.getAllBlogpostsRef.isLoading;
  isError = this.getAllBlogpostsRef.error;
  values = this.getAllBlogpostsRef.value;

}
