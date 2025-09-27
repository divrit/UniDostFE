import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableApartmentsComponent } from './available-apartments.component';

describe('AvailableApartmentsComponent', () => {
  let component: AvailableApartmentsComponent;
  let fixture: ComponentFixture<AvailableApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableApartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
