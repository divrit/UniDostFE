import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-uni-select',
  templateUrl: './uni-select.component.html',
  styleUrls: ['./uni-select.component.css']
})
export class UniSelectComponent implements OnInit {

  universities: string[] = []; 
  selectedUniversity: string = ''; 
  userEmail: string = '';
  emailEntered: boolean = false;
  searchText: string = '';
  filteredUniversities: { name: string }[] = []; 
  showDropdown: boolean = false;

  constructor(private universityService: UniversityService, private router: Router) { }

  ngOnInit(): void {
    this.loadUniversities("USA");

    // Get the stored university name and username on init
    this.selectedUniversity = this.universityService.getSelectedUniversity();
    this.userEmail = this.universityService.getUserName();
}


  loadUniversities(countryCode: string): void {
    this.universityService.getUniversitiesInUSA().subscribe({
      next: (universities: string[]) => {
        this.universities = universities;
        this.filteredUniversities = this.universities.map(name => ({ name }));
      },
      error: (error) => console.error('Failed to fetch universities', error)
    });
  }

  emailIsValid(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailEntered = regex.test(this.userEmail) && this.userEmail.endsWith('.edu');
    return this.emailEntered;
  }

  navigateTo(route: string): void {
    if (this.emailIsValid()) {
      this.router.navigate([`/${route}`]);
    } else {
      alert("Please enter a valid university email first.");
    }
  }

  filterUniversities(): void {
    if (this.searchText.trim().length === 0) {
      this.filteredUniversities = this.universities.map(name => ({ name }));
    } else {
      this.filteredUniversities = this.universities
        .filter(university => university.toLowerCase().includes(this.searchText.toLowerCase()))
        .map(name => ({ name }));
    }
    this.showDropdown = this.filteredUniversities.length > 0;
  }

  selectUniversity(name: string): void {
    this.selectedUniversity = name;
    this.searchText = name;
    this.showDropdown = false;

    // Save the selected university to the service
    this.universityService.setSelectedUniversity(name, this.userEmail);
}


}
