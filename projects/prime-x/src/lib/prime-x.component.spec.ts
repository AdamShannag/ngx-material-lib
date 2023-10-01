import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeXComponent } from './prime-x.component';

describe('PrimeXComponent', () => {
  let component: PrimeXComponent;
  let fixture: ComponentFixture<PrimeXComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeXComponent]
    });
    fixture = TestBed.createComponent(PrimeXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
