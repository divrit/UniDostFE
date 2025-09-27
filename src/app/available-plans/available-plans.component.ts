import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { PlanService } from '../services/plan.service';
import { Plan } from '../Models/plan.model';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-available-plans',
  templateUrl: './available-plans.component.html',
  styleUrls: ['./available-plans.component.css']
})
export class AvailablePlansComponent {

showContact: { [Key: number]: boolean} = {};
UniName: string = "";
type: string = '';


showContactM(id: number) {

    this.showContact[id] = true;
}


  constructor(private location: Location, private planService: PlanService, private univeristyService: UniversityService) {}
 
  plans: Plan[] = [];

  ngOnInit(): void {
      this.type = this.planService.getSelectedType();
      this.UniName = this.univeristyService.getSelectedUniversity();
      this.getPlansByType( this.type);
  }
  
 
  getPlansByType(type: string): void {
    this.planService.getPlansBySchoolNameAndType(this.UniName, type).subscribe((data: Plan[]) => {
      this.plans = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
