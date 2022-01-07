import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedetailsComponent } from './zonedetails.component';

describe('ZonedetailsComponent', () => {
  let component: ZonedetailsComponent;
  let fixture: ComponentFixture<ZonedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
