import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMonaClientComponent } from './ng-mona-client.component';

describe('NgMonaClientComponent', () => {
  let component: NgMonaClientComponent;
  let fixture: ComponentFixture<NgMonaClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMonaClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMonaClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
