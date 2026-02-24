import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Categoryservice } from '../../../shared/services/categoryservice';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss',
})
export class EditCategory {

  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') ?? '';
  private categoryService = inject(Categoryservice);

  editCategoryRef = this.categoryService.getCategoryById(this.id);
  editCategoryResponse = this.editCategoryRef.value;
  isLoading = this.editCategoryRef.isLoading
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form: FormGroup;
  isSubmitting = false;


  constructor() {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      urlHandle: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    });
    effect(() => {

      if (this.categoryService.updateCategoryStatus() === 'success') {
        this.router.navigate(['/dashboard', 'category']);
      }
      if (this.categoryService.updateCategoryStatus() === 'error') {
        this.isSubmitting = false;
        console.error('Failed to update category. Please try again.');
      }
    })

  }

  effectRef = effect(() => {
    this.form.controls['name'].patchValue(this.editCategoryResponse()?.name || '');
    this.form.controls['urlHandle'].patchValue(this.editCategoryResponse()?.urlHandle || '');
  });


  onSubmit() {
    const formValue = this.form.value;
    this.categoryService.updateCategory({ ...formValue, id: this.id });

  }

  onCancel() {
    this.router.navigate(['/dashboard', 'category']);
  }
  generateUrlHandle() {
    const name = this.form.get('name')?.value;
    if (name) {
      const urlHandle = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      this.form.patchValue({ urlHandle });
    }
  }
}
