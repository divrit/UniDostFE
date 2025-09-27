import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarSharingComponent } from './car-sharing/car-sharing.component';
import { UniSelectComponent } from './uni-select/uni-select.component';
import { PlanShareComponent } from './plan-share/plan-share.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { AvailablePlansComponent } from './available-plans/available-plans.component';
import { ApartmentSharingComponent } from './apartment-sharing/apartment-sharing.component';
import { AvailableApartmentsComponent } from './available-apartments/available-apartments.component';

const routes: Routes = [
 
  { path: '', component: UniSelectComponent},
  { path: 'uniselect', component: UniSelectComponent },
  { path: 'sharing', component: CarSharingComponent },
  { path: 'plan-sharing', component: PlanShareComponent },
  { path: 'apartment-sharing', component: ApartmentSharingComponent },
  { path: 'available-rides', component: AvailableRidesComponent },
  { path: 'available-plans', component: AvailablePlansComponent },
  { path: 'available-apartments', component: AvailableApartmentsComponent },
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
