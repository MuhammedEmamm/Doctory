import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappoinetmentsComponent } from './myappoinetments.component';

describe('MyappoinetmentsComponent', () => {
  let component: MyappoinetmentsComponent;
  let fixture: ComponentFixture<MyappoinetmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyappoinetmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappoinetmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
