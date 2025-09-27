import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanShareComponent } from './plan-share.component';

describe('PlanShareComponent', () => {
  let component: PlanShareComponent;
  let fixture: ComponentFixture<PlanShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
