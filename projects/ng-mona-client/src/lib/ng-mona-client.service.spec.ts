import { TestBed } from '@angular/core/testing';

import { NgMonaClientService } from './ng-mona-client.service';

describe('NgMonaClientService', () => {
  let service: NgMonaClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMonaClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
