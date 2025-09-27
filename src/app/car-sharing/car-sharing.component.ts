import { Component } from '@angular/core';
import { Ride } from '../Models/ride.model';
import { RideService } from '../services/ride.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-car-sharing',
  templateUrl: './car-sharing.component.html',
  styleUrls: ['./car-sharing.component.css']
})
export class CarSharingComponent {

  univeristyName: string ='';


  constructor(private rideService: RideService, private router: Router, private toastr: ToastrService, private universityService: UniversityService) { }




  rideDetails: Ride = {
    id: 0,
    name: '',
    sex: '',
    age: 0,
    price: '',
    purpose: '',
    contact: '',
    schoolName: '' 
  };


  postRide(): void {
    const rideToSave: Ride = {
      ...this.rideDetails,
      age: this.rideDetails.age  // Default to 0 if age is not provided
    };
    this.rideService.saveRide(rideToSave).subscribe(() => {
      // this.router.navigate(['/available-rides']);
      this.toastr.success('Ride posted successfully!');
      this.resetForm();
      this.router.navigate(['/available-rides'])
    }, error => {
      this.toastr.error('Failed to post the ride.');
    });
     
  }


  resetForm(): void {
    this.rideDetails = {
      id: 0,
      name: '',
      sex: '',
      age: 0,
      price: '',
      purpose: '',
      contact: '',
      schoolName: this.univeristyName
    };
  }


  ngOnInit(): void {
    // Subscribe to the selected university observable
      this.univeristyName =  this.universityService.getSelectedUniversity();
      this.rideDetails.schoolName = this.univeristyName;
  }

}