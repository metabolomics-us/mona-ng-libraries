import { TestBed } from '@angular/core/testing';

import { Commons } from './commons';

describe('Commons', () => {
  let service: Commons;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Commons ]
    });
    service = TestBed.inject(Commons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create headers correctly with no api key', () => {
    let options = service.buildRequestOptions();
    expect(Object.keys(options).length).toBe(1);

    options = service.buildRequestOptions({test: -1});
    expect(Object.keys(options).length).toBe(2);
    expect((options as any).test).toBe(-1);
  });

  it('should create headers correctly with an api key set', () => {
    service.setAPIKey('test');

    let options = service.buildRequestOptions();
    expect(Object.keys(options).length).toBe(1);
    expect(options.headers.has('Authorization'));

    options = service.buildRequestOptions({test: -1});
    expect(Object.keys(options).length).toBe(2);
    expect(options.headers.has('Authorization'));
    expect((options as any).test).toBe(-1);
  });
});
