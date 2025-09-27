import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniSelectComponent } from './uni-select/uni-select.component';
import { HeaderComponent } from './header/header.component';
import { UniversityService } from './services/university.service';
import { HttpClientModule } from '@angular/common/http';
import { CarSharingComponent } from './car-sharing/car-sharing.component';
import { PlanShareComponent } from './plan-share/plan-share.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { AvailablePlansComponent } from './available-plans/available-plans.component';
import { ApartmentSharingComponent } from './apartment-sharing/apartment-sharing.component';
import { AvailableApartmentsComponent } from './available-apartments/available-apartments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    UniSelectComponent,
    HeaderComponent,
    CarSharingComponent,
    PlanShareComponent,
    AvailableRidesComponent,
    AvailablePlansComponent,
    ApartmentSharingComponent,
    AvailableApartmentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [UniversityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
