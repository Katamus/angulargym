import { TestBed } from '@angular/core/testing';

import { MensakesService } from './mensakes.service';

describe('MensakesService', () => {
  let service: MensakesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensakesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
