import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownVisible: boolean = false;
  darkTheme: boolean = false;

  onImageClick(): void {
    console.log('Logo clicked');
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

  onSearch(event: any): void {
    console.log('Search:', event.target.value);
  }
}
