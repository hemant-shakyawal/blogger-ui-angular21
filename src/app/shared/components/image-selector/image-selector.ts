import { Component, inject, signal } from '@angular/core';
import { Imageselectorservice } from '../../services/imageselectorservice';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogImageModel } from '../../models/image.model';

@Component({
  selector: 'app-image-selector',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.scss',
})
export class ImageSelector {
  id = signal<string | undefined>(undefined);
  private imageSelectorService = inject(Imageselectorservice);
  showImageSelector = this.imageSelectorService.showImageSelector.asReadonly();
  imageResourceRef = this.imageSelectorService.getAllImages(this.id);
  isLoading = this.imageResourceRef.isLoading;
  images = this.imageResourceRef.value ?? [];



  imageSelectionUpoadForm = new FormGroup({

    file: new FormControl<File | null | undefined>(null, { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
  })



  hideImageSelector() {

    this.imageSelectorService.hideImageSelector();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length === 0) {
      return;
    }
    const file = input.files![0];
    this.imageSelectionUpoadForm.patchValue({
      file: file
    });

  }

  onSubmit() {
    if (this.imageSelectionUpoadForm.valid) {
      const formRawValue = this.imageSelectionUpoadForm.getRawValue();


      this.imageSelectorService.uploadImage(formRawValue.file!, formRawValue.name, formRawValue.title).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          this.id.set(response.id?.toString());


        },
        error: (error) => {
          console.error('Failed to upload image:', error);
        }
      });
    }
  }

  selectImage(image: BlogImageModel) {
    this.imageSelectorService.selectImage(image.url);
  }
}
