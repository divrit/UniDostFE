import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../Models/plan.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'https://api.unidosti.com/api/plans';

  private readonly localStorageKey = 'type';
  private selectedTypeSubject: BehaviorSubject<string>;
  selectedType$: Observable<string>;

  constructor(private http: HttpClient) {
    const storedUniversity = localStorage.getItem(this.localStorageKey) || '';
    this.selectedTypeSubject = new BehaviorSubject<string>(storedUniversity);
    this.selectedType$ = this.selectedTypeSubject.asObservable();
  }


  
  setSelectedType(type: string): void {
    this.selectedTypeSubject.next(type);
    localStorage.setItem(this.localStorageKey, type);
  }

  getSelectedType(): string {
    return this.selectedTypeSubject.getValue();
  }



  savePlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }


  getPlansBySchoolNameAndType(schoolName: string, type: string): Observable<Plan[]> {
    const url = `${this.apiUrl}/${encodeURIComponent(schoolName)}/type/${type}`;
    return this.http.get<Plan[]>(url);
  }


}
