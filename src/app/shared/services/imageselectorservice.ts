import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImageModel } from '../models/image.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Imageselectorservice {

  http = inject(HttpClient);

  showImageSelector = signal<boolean>(false);
  selectedImage = signal<string | null>(null);

  displayImageSelector() {
    this.showImageSelector.set(true);
  }
  hideImageSelector() {
    this.showImageSelector.set(false);
  }
  uploadImage(file: File, name: string, title: string): Observable<BlogImageModel> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('FileName', name)
    formData.append('title', title);

    return this.http.post<BlogImageModel>(`${environment.apiUrl}/images`, formData);

  }

  getAllImages(id: WritableSignal<string | undefined>): HttpResourceRef<BlogImageModel[] | undefined> {
    return httpResource<BlogImageModel[]>(() => {

      id();
      return `${environment.apiUrl}/images`
    });
  }
  selectImage(imageUrl: string) {
    this.selectedImage.set(imageUrl);
    this.hideImageSelector();


  }

}

