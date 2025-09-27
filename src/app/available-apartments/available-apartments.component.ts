import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApartmentService } from '../services/apartment.service';
import { Apartment } from '../Models/apartment.model';
import { UniversityService } from '../services/university.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'available-apartments',
  templateUrl: './available-apartments.component.html',
  styleUrls: ['./available-apartments.component.css']
})
export class AvailableApartmentsComponent {

  constructor(private location: Location, private apartmentService: ApartmentService, private univeristyService: UniversityService, private toastr: ToastrService) {}

  UniName: string = "";
  type: string = "";

  ngOnInit(): void {
    this.UniName = this.univeristyService.getSelectedUniversity();
    console.log( "tEST" +this.UniName);
    this.type = this.apartmentService.getSelectedType();

    this.getApartmentsBySchoolNameAndType();
  }




  getApartmentsBySchoolNameAndType(): void {
    if (this.UniName || this.type) {

      this.apartmentService.getApartmentsBySchoolNameAndType(this.UniName, this.type).subscribe(
        (apartments: Apartment[]) => {
          this.apartments = apartments;
        },
        (error) => {
          this.toastr.error('Error fetching apartments by filter: ' + error.message);
          console.error('Error fetching apartments by filter', error);
        }
      );
    } else {
      this.toastr.warning('Please select both school name and type to filter apartments.');
    }
  }

  apartments: Apartment[] = [
    {
      name: '',
      sex: '',
      price: '',
      type: '',
      instructions: '',
      schoolName: '' ,
      user: '' ,
      contact: ''
    
    }
   
  ];

  goBack(): void {
    this.location.back();
  }


  

}
