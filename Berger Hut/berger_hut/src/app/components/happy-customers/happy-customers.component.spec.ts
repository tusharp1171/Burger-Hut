import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyCustomersComponent } from './happy-customers.component';

describe('HappyCustomersComponent', () => {
  let component: HappyCustomersComponent;
  let fixture: ComponentFixture<HappyCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HappyCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
