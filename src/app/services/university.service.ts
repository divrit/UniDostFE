import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UniversityService {

  private readonly localStorageKey = 'universityName';
  private readonly localStorageUserNameKey = 'userName';
  
  private selectedUniversitySubject: BehaviorSubject<string>;
  selectedUniversity$: Observable<string>;

  constructor(private http: HttpClient) {
    // Load stored values from localStorage
    const storedUniversity = localStorage.getItem(this.localStorageKey) || '';
    this.selectedUniversitySubject = new BehaviorSubject<string>(storedUniversity);
    this.selectedUniversity$ = this.selectedUniversitySubject.asObservable();
  }

  // Set the selected university and user name
  setSelectedUniversity(university: string, userName: string): void {
    this.selectedUniversitySubject.next(university);
    localStorage.setItem(this.localStorageKey, university);
    localStorage.setItem(this.localStorageUserNameKey, userName);
  }

  // Get the selected university from BehaviorSubject or localStorage
  getSelectedUniversity(): string {
    const university = this.selectedUniversitySubject.getValue();
    if (!university) {
      const storedUniversity = localStorage.getItem(this.localStorageKey) || '';
      this.selectedUniversitySubject.next(storedUniversity);
      return storedUniversity;
    }
    return university;
  }

  // Get the user name from localStorage
  getUserName(): string {
    return localStorage.getItem(this.localStorageUserNameKey) || "";
  }

  // Fetch universities from JSON file
  getUniversitiesInUSA(): Observable<string[]> {
    return this.http.get<{ universities: string[] }>('assets/usa_universities.json')
      .pipe(
        map(response => response.universities) // Extract the universities array
      );
  }

  // Clear stored data
  clearUniversityData(): void {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.localStorageUserNameKey);
    this.selectedUniversitySubject.next('');
  }
}
