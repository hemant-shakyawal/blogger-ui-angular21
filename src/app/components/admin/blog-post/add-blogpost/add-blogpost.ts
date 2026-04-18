import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blogpostservice } from '../../../../shared/services/blogpostservice';
import { BlogpostModel } from '../../../../shared/models/blogpost.model';
import { MarkdownComponent } from 'ngx-markdown';
import { Categoryservice } from '../../../../shared/services/categoryservice';
import { Imageselectorservice } from '../../../../shared/services/imageselectorservice';


@Component({
  selector: 'app-add-blogpost',
  imports: [CommonModule, ReactiveFormsModule, MarkdownComponent],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.scss',
})
export class AddBlogpost {
  private blogpostService = inject(Blogpostservice);
  private categoryService = inject(Categoryservice);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  imageSelectorService = inject(Imageselectorservice);
  private getAllCategoriesRef = this.categoryService.getAllCategories();
  categoriesResponse = this.getAllCategoriesRef.value;
  form: FormGroup;
  isSubmitting = false;

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      shortDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      featuredImageUrl: ['', [Validators.required, Validators.maxLength(200)]],
      urlHandle: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
      publishDate: [
        new Date().toISOString().split('T')[0],
        [Validators.required]
      ],
      author: [''],
      isVisible: [true],
      categories: [[]]

    });

    effect(() => {
      if (this.blogpostService.addBlogpostStatus() === 'success') {
        this.blogpostService.addBlogpostStatus.set('idle');
        this.router.navigate(['/dashboard/blog-post']);
      }
      if (this.blogpostService.addBlogpostStatus() === 'error') {
        this.isSubmitting = false;
        this.blogpostService.addBlogpostStatus.set('idle');
        console.error('Failed to save blog post. Please try again.');
      }
    });
  }



  selectedImageEffectRef = effect(() => {
    const selectedImageUrl = this.imageSelectorService.selectedImage();
    if (selectedImageUrl) {
      this.form.patchValue({ featuredImageUrl: selectedImageUrl });
    }


  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    const blogValue = this.form.value;
    const post: BlogpostModel = {
      title: blogValue.title,
      shortDescription: blogValue.shortDescription,
      content: blogValue.content,
      featuredImageUrl: blogValue.featuredImageUrl,
      urlHandle: blogValue.urlHandle,
      publishDate: blogValue.publishDate ? new Date(blogValue.publishDate) : new Date(),
      author: blogValue.author,
      isVisible: blogValue.isVisible,
      categories: blogValue.categories || []
    };


    this.blogpostService.createBlogpost(post);
  }

  onCancel() {
    this.router.navigate(['/dashboard/blog-post']);
  }
}

