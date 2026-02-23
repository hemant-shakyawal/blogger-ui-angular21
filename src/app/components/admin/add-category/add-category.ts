import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../shared/models/category.model';
import { Categoryservice } from '../../../shared/services/categoryservice';


@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory {

  private categoryService = inject(Categoryservice);
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
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.router.navigate(['/dashboard/category']);
      }
      if (this.categoryService.addCategoryStatus() === 'error') {
        this.isSubmitting = false;
        console.error('Failed to add category. Please try again.');
      }
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formValue = this.form.value;
    console.log('Form Value:', this.form.value);

    const formData: CategoryModel = {
      name: formValue.name,
      urlHandle: formValue.urlHandle
    }
    this.categoryService.createCategory(formData);



  }

  onCancel() {
    this.router.navigate(['/dashboard/category']);
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
