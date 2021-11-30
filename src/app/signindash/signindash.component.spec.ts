import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignindashComponent } from './signindash.component';

describe('SignindashComponent', () => {
  let component: SignindashComponent;
  let fixture: ComponentFixture<SignindashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignindashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignindashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
