
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BlogpostModel } from '../models/blogpost.model';
import { HttpClient, httpResource } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Blogpostservice {
  http = inject(HttpClient);
  addBlogpostStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  updateBlogpostStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  deleteBlogpostStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  createBlogpost(post: BlogpostModel) {
    this.addBlogpostStatus.set('loading');
    this.http.post<void>(`${environment.apiUrl}/blogpost`, post).subscribe({
      next: () => this.addBlogpostStatus.set('success'),
      error: () => this.addBlogpostStatus.set('error'),
    });
  }

  getAllBlogposts() {
    return httpResource<BlogpostModel[]>(() => `${environment.apiUrl}/blogpost`);
  }

  getBlogpostById(id: number | string) {
    return httpResource<BlogpostModel>(() => `${environment.apiUrl}/blogpost/${id}`);
  }

  updateBlogpost(post: BlogpostModel) {
    if (!post.id) return;
    this.updateBlogpostStatus.set('loading');
    this.http.put<void>(`${environment.apiUrl}/blogpost/${post.id}`, post).subscribe({
      next: () => this.updateBlogpostStatus.set('success'),
      error: () => this.updateBlogpostStatus.set('error'),
    });
  }

  deleteBlogpost(id: number | string) {
    this.deleteBlogpostStatus.set('loading');
    this.http.delete<void>(`${environment.apiUrl}/blogpost/${id}`).subscribe({
      next: () => this.deleteBlogpostStatus.set('success'),
      error: () => this.deleteBlogpostStatus.set('error'),
    });
  }
}
