import { Component } from '@angular/core';
import { Plan } from '../Models/plan.model';
import { PlanService } from '../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-plan-share',
  templateUrl: './plan-share.component.html',
  styleUrls: ['./plan-share.component.css']
})
export class PlanShareComponent {

  univeristyName: string ="";

  planDetails: Plan = {
    id: 0,
    name: '',
    sex: '',
    age: 0,
    price: '',
    type: '',
    contact: '',
    schoolName: '' 
  };

  plans: Plan[] = [];

  constructor(private planService: PlanService, private toastr: ToastrService, private universityService:UniversityService) { }

  ngOnInit(): void {
    // Subscribe to the selected university observable
      this.univeristyName =  this.universityService.getSelectedUniversity();
      this.planDetails.schoolName = this.univeristyName;
  }

  postPlan(): void {
    this.planService.savePlan(this.planDetails).subscribe(() => {
      this.toastr.success('Plan posted successfully!');
      this.resetForm();
    }, error => {
      this.toastr.error('Failed to post the plan.');
    });
  }

  resetForm(): void {
    this.planDetails = {
      id: 0,
      name: '',
      sex: '',
      age: 0,
      price: '',
      type: 'Phone',
      contact: '',
      schoolName: this.univeristyName 
    };
  }

  setType(type: string){
    this.planService.setSelectedType(type);
  }




}
  