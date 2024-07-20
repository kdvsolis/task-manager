import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerComponent } from './planner.component';

describe('SubComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerComponent]
    });
    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
