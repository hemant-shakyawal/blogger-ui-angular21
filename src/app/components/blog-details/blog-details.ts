import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Blogpostservice } from '../../shared/services/blogpostservice';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';


@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss'],
})
export class BlogDetails {
  route = inject(ActivatedRoute);

  // Get the 'url' parameter from the route (matches the route definition 'blog/:url')
  url = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('url'))
    )
  );

  blogPostService = inject(Blogpostservice);
  blogPostDetailsRef = this.blogPostService.getBlogPostDetailsByUrlHandle(this.url);
  isLoading = this.blogPostDetailsRef.isLoading;
  blogPostDetailsResponse = this.blogPostDetailsRef.value;
}
