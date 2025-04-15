import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Offer } from '../../../models/Offer';
import { OffersService } from '../../../services/offers/offers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-offers',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-offers.component.html',
  styleUrl: './admin-offers.component.css'
})
export class AdminOffersComponent {
  offerForm: FormGroup;
  offers: Offer[] = [];
  selectedOfferId: number | null = null;
  successMessage = '';
  errorMessage = '';
  selectedFile: File | null = null;
  currentImagePreview: string | null = null;

  constructor(private fb: FormBuilder, private offersService: OffersService) {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      validTill: ['', Validators.required],
      image: [''], // used only for file input change detection
      percentageOff: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  ngOnInit(): void {
    this.fetchOffers();
  }

  // Fetch all offers
  fetchOffers() {
    this.offersService.getAllOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (err) => {
        console.error('Failed to load offers', err);
        this.errorMessage = '❌ Failed to load offers.';
      },
    });
  }

  // Handle file selection
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    // Preview selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.offerForm.invalid) return;
  
    const formValue = this.offerForm.value;
    const formData = new FormData();
  
    // Add image if selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
  
    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('code', formValue.code);
    formData.append('validTill', new Date(formValue.validTill).toISOString());
    formData.append('percentageOff', formValue.percentageOff.toString());
  
    if (this.selectedOfferId) {
      // 👉 UPDATE EXISTING OFFER
      this.offersService.updateOffer(this.selectedOfferId, formData).subscribe({
        next: (updatedOffer) => {
          this.successMessage = '✅ Offer updated successfully!';
          this.errorMessage = '';
          this.fetchOffers(); // refresh the list
          this.resetForm();
        },
        error: (error) => {
          this.errorMessage = '❌ Failed to update offer.';
          this.successMessage = '';
          console.error('Update error:', error);
        },
      });
    } else {
      // ➕ CREATE NEW OFFER
      if (!this.selectedFile) return;
  
      this.offersService.createOffer(formData).subscribe({
        next: (createdOffer) => {
          this.successMessage = '✅ Offer created successfully!';
          this.errorMessage = '';
          this.offers.push(createdOffer);
          this.resetForm();
        },
        error: (error) => {
          this.errorMessage = '❌ Failed to create offer.';
          this.successMessage = '';
          console.error('Create error:', error);
        },
      });
    }
  }

  // Populate form for editing
  editOffer(offer: Offer) {
    this.selectedOfferId = offer.id || null;
    this.offerForm.patchValue({
      title: offer.title,
      description: offer.description,
      code: offer.code,
      validTill: offer.validTill.split('T')[0], // Convert to date input format
      percentageOff: offer.percentageOff,
    });

    // Preview the current image of the offer
    this.currentImagePreview = '/' + offer.image;
    this.selectedFile = null;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Reset the form
  resetForm() {
    this.offerForm.reset();
    this.selectedOfferId = null;
    this.selectedFile = null;
    this.currentImagePreview = null;
  }

  // Utility to build full image URL
  getImageUrl(imagePath: string): string {
    return '/' + imagePath;
  }


  deleteOffer(offerId: number): void {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offersService.deleteOffer(offerId).subscribe({
        next: () => {
          // Remove the deleted offer from the local array
          this.offers = this.offers.filter(offer => offer.id !== offerId);
          this.successMessage = '✅ Offer deleted successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = '❌ Failed to delete offer.';
          this.successMessage = '';
          console.error('Delete error:', error);
        },
      });
    }
  }
  
}       