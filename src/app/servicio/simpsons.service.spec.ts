import { TestBed } from '@angular/core/testing';

import { SimpsonsService } from './simpsons.service';

describe('OnepieceService', () => {
  let service: SimpsonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpsonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
