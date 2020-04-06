import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgChemdoodleComponent } from './ng-chemdoodle.component';

describe('NgChemdoodleComponent', () => {
  let component: NgChemdoodleComponent;
  let fixture: ComponentFixture<NgChemdoodleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgChemdoodleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgChemdoodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
