import { Component, inject } from '@angular/core';
import { Blogpostservice } from '../../shared/services/blogpostservice';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  blogPostService = inject(Blogpostservice);
  blogPostsRef = this.blogPostService.getAllBlogposts();
  isLoding = this.blogPostsRef.isLoading;
  blogPostsResponse = this.blogPostsRef.value;
}
