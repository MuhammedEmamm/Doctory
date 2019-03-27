import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalslistComponent } from './hospitalslist.component';

describe('HospitalslistComponent', () => {
  let component: HospitalslistComponent;
  let fixture: ComponentFixture<HospitalslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
