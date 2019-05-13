import { TestBed } from '@angular/core/testing';

import { SyncFirebaseStorageService } from './sync-firebase-storage.service';

describe('SyncFirebaseStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncFirebaseStorageService = TestBed.get(SyncFirebaseStorageService);
    expect(service).toBeTruthy();
  });
});
