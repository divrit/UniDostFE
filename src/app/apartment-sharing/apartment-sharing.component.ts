import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Apartment } from '../Models/apartment.model';
import { ApartmentService } from '../services/apartment.service';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../services/university.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'apartment-sharing',
  templateUrl: './apartment-sharing.component.html',
  styleUrls: ['./apartment-sharing.component.css']
})
export class ApartmentSharingComponent implements OnInit {

  univeristyName: string = '';
  apartment: Apartment = {
    id: 0,
    name: '',
    sex: '',
    price: '',
    type: '',
    instructions: '',
    schoolName: '',
    user: '',
    contact: ''
  };

  selectedFiles: File[] = [];

  constructor(
    private apartmentService: ApartmentService,
    private toastr: ToastrService,
    private universityService: UniversityService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Fetch the selected university name from the UniversityService
    this.univeristyName = this.universityService.getSelectedUniversity();
    this.apartment.schoolName = this.univeristyName;
    this.apartment.user = this.universityService.getUserName();
  }

  setApartmentType(type: string) {
    this.apartment.type = type;
    this.apartmentService.setSelectedType(type);
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSaveApartment(apartmentForm: any, fileInput: HTMLInputElement): void {
    if (apartmentForm.invalid) {
      this.toastr.error('Please fill out all required fields correctly.');
      return;
    }

    if (this.selectedFiles.length === 0) {
      this.toastr.error('Please attach at least 1 image to continue');
      return;
    }

    this.apartmentService.saveApartmentWithImages(this.apartment, this.selectedFiles, this.apartment.user)
      .subscribe(
        (response: Apartment) => {
          this.toastr.success('Apartment saved successfully with images!');
          this.resetForm(fileInput);
          apartmentForm.resetForm();
        },
        (error) => {
          this.toastr.error('Error saving apartment with images: ' + error.message);
        }
      );
  }

  resetForm(fileInput: HTMLInputElement): void {
    this.apartment = {
      id: 0,
      name: '',
      sex: '',
      price: '',
      type: '',
      instructions: '',
      schoolName: this.univeristyName,
      user: this.apartment.user,
      contact: ''
    };
    this.selectedFiles = [];
    fileInput.value = '';
  }
}
