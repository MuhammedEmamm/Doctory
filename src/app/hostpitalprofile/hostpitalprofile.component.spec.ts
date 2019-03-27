import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostpitalprofileComponent } from './hostpitalprofile.component';

describe('HostpitalprofileComponent', () => {
  let component: HostpitalprofileComponent;
  let fixture: ComponentFixture<HostpitalprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostpitalprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostpitalprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
