import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class Categoryservice {
  http = inject(HttpClient);
  addCategoryStatus=signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  createCategory(category: CategoryModel) {
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${environment.apiUrl}/categories`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: () => {
        this.addCategoryStatus.set('error');
      }
    });
  }

  getAllCategories() {
    return httpResource<CategoryModel[]>(() => `${environment.apiUrl}/categories`);
  }
}
