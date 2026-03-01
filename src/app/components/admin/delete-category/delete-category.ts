import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Categoryservice } from '../../../shared/services/categoryservice';

@Component({
  selector: 'app-delete-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-category.html',
  styleUrl: './delete-category.scss',
})
export class DeleteCategory {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') ?? '';
  private categoryService = inject(Categoryservice);
  private router = inject(Router);

  categoryRef = this.categoryService.getCategoryById(this.id);
  category = this.categoryRef.value;
  isLoading = this.categoryRef.isLoading;

  constructor() {
    effect(() => {
      if (this.categoryService.deleteCategoryStatus() === 'success') {
        this.router.navigate(['/dashboard', 'category']);
      }
      if (this.categoryService.deleteCategoryStatus() === 'error') {
        console.error('Failed to delete category. Please try again.');
      }
    });
  }

  onDelete() {
    if (!this.id) {
      console.error('No category id provided for deletion.');
      return;
    }

    // Basic validation: ensure category loaded
    const current = this.category?.();
    if (!current || !current.id) {
      console.error('Category not loaded yet. Please wait and try again.');
      return;
    }

    this.categoryService.deleteCategory(this.id);
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'category']);
  }
}
