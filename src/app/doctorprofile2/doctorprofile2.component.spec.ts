import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctorprofile2Component } from './doctorprofile2.component';

describe('Doctorprofile2Component', () => {
  let component: Doctorprofile2Component;
  let fixture: ComponentFixture<Doctorprofile2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Doctorprofile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Doctorprofile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
