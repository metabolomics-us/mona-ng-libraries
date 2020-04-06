import { TestBed } from '@angular/core/testing';

import { NgChemdoodleService } from './ng-chemdoodle.service';

describe('NgChemdoodleService', () => {
  let service: NgChemdoodleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgChemdoodleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
