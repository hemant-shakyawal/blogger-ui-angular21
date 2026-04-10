import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blogpostservice } from '../../../../shared/services/blogpostservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-blogpost',
  imports: [CommonModule],
  templateUrl: './delete-blogpost.html',
  styleUrl: './delete-blogpost.scss',
})
export class DeleteBlogpost {
  private route = inject(ActivatedRoute);
  private blogpostService = inject(Blogpostservice);
  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id') ?? '';

  // Get blog post data
  blogpostRef = this.blogpostService.getBlogpostById(this.id);
  blogpost = this.blogpostRef.value;
  isLoading = this.blogpostRef.isLoading;

  // State management
  isDeleting = false;

  constructor() {
    // Handle delete response
    effect(() => {
      if (this.blogpostService.deleteBlogpostStatus() === 'success') {
        this.blogpostService.deleteBlogpostStatus.set('idle');
        this.router.navigate(['/dashboard', 'blog-post']);
      }
      if (this.blogpostService.deleteBlogpostStatus() === 'error') {
        this.isDeleting = false;
        console.error('Failed to delete blog post. Please try again.');
        this.blogpostService.deleteBlogpostStatus.set('idle');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard', 'blog-post']);
  }

  onDelete(): void {
    if (this.id) {
      this.isDeleting = true;
      this.blogpostService.deleteBlogpost(this.id);
    }
  }
}
