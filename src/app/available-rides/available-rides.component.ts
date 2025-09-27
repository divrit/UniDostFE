import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Ride } from '../Models/ride.model';
import { RideService } from '../services/ride.service';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-available-rides',
  templateUrl: './available-rides.component.html',
  styleUrls: ['./available-rides.component.css']
})
export class AvailableRidesComponent {

  constructor(private location: Location, private rideService: RideService, private univeristyService:UniversityService) {}
  
  showContact: { [key: number]: boolean } = {};

  uniName: string="";
  rideDetails: Ride[] = [];


  rides: Ride[] = [];

  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
   
    this.uniName = this.univeristyService.getSelectedUniversity();
    this.getRides();
  }

  // ngAfterViewInit(): void {
  //   this.getRides();
  // }

  getRides(): void { 
    console.log("inside aviaoable rides" +this.uniName)
    this.rideService.getRidesBySchoolName(this.uniName).subscribe((data: Ride[]) => {
      this.rides = data;
    });
  }



  showContactM(id : number){
    this.showContact[id] = true
  }

}
