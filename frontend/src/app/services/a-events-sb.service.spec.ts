import { TestBed } from '@angular/core/testing';

import { AEventsSbService } from './a-events-sb.service';

describe('AEventsSbService', () => {
  let service: AEventsSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AEventsSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
