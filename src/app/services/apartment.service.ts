import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Apartment } from '../Models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiUrl = 'https://api.unidosti.com/api/apartments';

  private readonly localStorageKey = 'ApartmentType';
  private apartmentsSubject = new BehaviorSubject<Apartment[]>(this.getApartmentsFromLocalStorage());
  apartments$ = this.apartmentsSubject.asObservable();

  setApartments(apartments: Apartment[]): void {
    this.apartmentsSubject.next(apartments);
    localStorage.setItem('apartments', JSON.stringify(apartments));
  }

  private getApartmentsFromLocalStorage(): Apartment[] {
    const apartments = localStorage.getItem('apartments');
    return apartments ? JSON.parse(apartments) : [];
  }

  constructor(private http: HttpClient) { }


  getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apiUrl).pipe(
        tap((apartments: Apartment[]) => this.setApartments(apartments)),
        catchError(this.handleError)
      );
  }

  setSelectedType(type: string): void {
   
    localStorage.setItem(this.localStorageKey, type);
  }

  getSelectedType(): string {
    return localStorage.getItem(this.localStorageKey) || "";
  }



    saveApartmentWithImages(apartment: Apartment, files: File[], username: string): Observable<Apartment> {
    const formData: FormData = new FormData();
    formData.append('apartment', new Blob([JSON.stringify(apartment)], { type: 'application/json' }));
    formData.append('username', username); // Add username to FormData
  
    files.forEach(file => formData.append('files', file, file.name));
  
    return this.http.post<Apartment>(`${this.apiUrl}/save`, formData).pipe(
      catchError(this.handleError)
    );
  }


  getApartmentsBySchoolNameAndType(schoolName: string, type: string): Observable<Apartment[]> {
    const url = `${this.apiUrl}/school/${schoolName}/type/${type}`;
    return this.http.get<Apartment[]>(url).pipe(
      tap((apartments: Apartment[]) => this.setApartments(apartments)),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}