import { Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoryservice } from '../../../shared/services/categoryservice';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private categoryservice = inject(Categoryservice);

  private getAllCategoriesRef = this.categoryservice.getAllCategories();

  isLodading = this.getAllCategoriesRef.isLoading;

  isError = this.getAllCategoriesRef.error;
  values = this.getAllCategoriesRef.value;

}
