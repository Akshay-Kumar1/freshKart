import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, beforeEach } from 'vitest';

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientModule , RouterTestingModule]
  }));

  it('should be created', () => {
    const service: UserServiceService = TestBed.inject(UserServiceService);
    expect(service).toBeTruthy();
  });
});
