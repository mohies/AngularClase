import { TestBed } from '@angular/core/testing';

import { OnepieceService } from './onepiece.service';

describe('OnepieceService', () => {
  let service: OnepieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnepieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
