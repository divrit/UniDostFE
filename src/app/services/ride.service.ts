import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from '../Models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private apiUrl = 'https://api.unidosti.com/api/rides';

  constructor(private http: HttpClient) { }

  getRidesBySchoolName(schoolName: string): Observable<Ride[]> {
    console.log("sssdis" +schoolName);
    const url = `${this.apiUrl}/school/${schoolName}`;
    return this.http.get<Ride[]>(url);
  }

  saveRide(ride: Ride): Observable<Ride> {
    return this.http.post<Ride>(this.apiUrl, ride);
  }
}
