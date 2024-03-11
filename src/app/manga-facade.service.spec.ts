import { TestBed } from '@angular/core/testing';

import { MangaFacadeService } from './manga-facade.service';

describe('MangaFacadeService', () => {
  let service: MangaFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
