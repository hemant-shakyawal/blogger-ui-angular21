import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Blogpostservice } from '../../../../shared/services/blogpostservice';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoryservice } from '../../../../shared/services/categoryservice';
import { MarkdownComponent } from 'ngx-markdown';
import { ImageSelector } from '../../../../shared/components/image-selector/image-selector';
import { Imageselectorservice } from '../../../../shared/services/imageselectorservice';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MarkdownComponent, ],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.scss',
})
export class EditBlogpost {

  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') ?? '';
  private blogpostService = inject(Blogpostservice);
  private categoryService = inject(Categoryservice);
  private imageSelectorService = inject(Imageselectorservice);
  editBlogpostRef = this.blogpostService.getBlogpostById(this.id);
  editBlogpostResponse = this.editBlogpostRef.value;

  private getAllCategoriesRef = this.categoryService.getAllCategories();
  categoriesResponse = this.getAllCategoriesRef.value;
  isLoading = this.editBlogpostRef.isLoading
  private fb = inject(FormBuilder);
  private router = inject(Router);

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

      if (this.blogpostService.updateBlogpostStatus() === 'success') {
        this.blogpostService.updateBlogpostStatus.set('idle');
        this.router.navigate(['/dashboard', 'blog-post']);
      }
      if (this.blogpostService.updateBlogpostStatus() === 'error') {
        this.isSubmitting = false;
        console.error('Failed to update blog post. Please try again.');
        this.blogpostService.updateBlogpostStatus.set('idle')
      }
    })
  }

  effectRef = effect(() => {
    this.form.controls['title'].patchValue(this.editBlogpostResponse()?.title || '');
    this.form.controls['shortDescription'].patchValue(this.editBlogpostResponse()?.shortDescription || '');
    this.form.controls['content'].patchValue(this.editBlogpostResponse()?.content || '');
    this.form.controls['featuredImageUrl'].patchValue(this.editBlogpostResponse()?.featuredImageUrl || '');
    this.form.controls['urlHandle'].patchValue(this.editBlogpostResponse()?.urlHandle || '');

    const publishDate = this.editBlogpostResponse()?.publishDate;

    this.form.controls['publishDate'].patchValue(
      publishDate ? new Date(publishDate).toISOString().split('T')[0] : ''
    );

    this.form.controls['author'].patchValue(this.editBlogpostResponse()?.author || '');
    this.form.controls['isVisible'].patchValue(this.editBlogpostResponse()?.isVisible || true);
    this.form.controls['categories'].patchValue(this.editBlogpostResponse()?.categories || []);
  });

  selectedImageEffectRef = effect(() => {
    const selectedImageUrl = this.imageSelectorService.selectedImage();
    if (selectedImageUrl) {
      this.form.patchValue({ featuredImageUrl: selectedImageUrl });
    }


  });


  onSubmit() {
    const formValue = this.form.value;
    this.blogpostService.updateBlogpost({ ...formValue, id: this.id });

  }

  onCancel() {
    this.router.navigate(['/dashboard', 'blog-post']);
  }
  openImageSelector() {
    this.imageSelectorService.displayImageSelector();
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
