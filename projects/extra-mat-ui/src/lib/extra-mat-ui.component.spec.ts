import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraMatUiComponent } from './extra-mat-ui.component';

describe('ExtraMatUiComponent', () => {
  let component: ExtraMatUiComponent;
  let fixture: ComponentFixture<ExtraMatUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraMatUiComponent]
    });
    fixture = TestBed.createComponent(ExtraMatUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
