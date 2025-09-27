import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentSharingComponent } from './apartment-sharing.component';

describe('ApartmentSharingComponent', () => {
  let component: ApartmentSharingComponent;
  let fixture: ComponentFixture<ApartmentSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentSharingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
