import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemService } from '../../../services/menu-item.service';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-admin-menu',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent implements OnInit{
  menuItem: any = {
    name: '',
    description: '',
    price: null,
    available: true,
    categoryId: null,
  };

  categories: any[] = [];
  menuItems: any[] = [];
  filteredMenuItems: any[] = [];
  selectedCategoryId: number = 0;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private menuItemService: MenuItemService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMenuItems();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadMenuItems(): void {
    this.menuItemService.getAll().subscribe((data) => {
      this.menuItems = data;
      this.applyFilter(); // Filter on load
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('name', this.menuItem.name);
    formData.append('description', this.menuItem.description);
    formData.append('price', this.menuItem.price);
    formData.append('available', this.menuItem.available);
    formData.append('categoryId', this.menuItem.categoryId);

    this.menuItemService.createWithImage(formData).subscribe(() => {
      alert('Menu item added successfully!');
      this.resetForm();
      this.loadMenuItems(); // reload + filter
    });

   
  }

  resetForm(): void {
    this.menuItem = {
      name: '',
      description: '',
      price: null,
      available: true,
      categoryId: null,
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }

  applyFilter(): void {
    console.log('Selected Category ID:', this.selectedCategoryId);
    console.log('Menu Items:', this.menuItems);
  
    if (Number(this.selectedCategoryId) === 0) {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter((item) => {
        const itemCatId = item.category?.id || item.categoryId;
        return Number(itemCatId) === Number(this.selectedCategoryId);
      });
    }
  
    console.log('Filtered Items:', this.filteredMenuItems);
  }
  

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.menuItemService.delete(id).subscribe(() => {
        alert('Menu item deleted!');
        this.loadMenuItems(); // Refresh the list
      });
    }
  }
  
  onCategoryChange(): void {
    this.applyFilter();
  }
}
