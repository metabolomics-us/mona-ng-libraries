import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Commons } from '../commons';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ Commons ]
    });
    service = TestBed.inject(NewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
