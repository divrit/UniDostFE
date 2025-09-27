import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSelectComponent } from './uni-select.component';

describe('UniSelectComponent', () => {
  let component: UniSelectComponent;
  let fixture: ComponentFixture<UniSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
