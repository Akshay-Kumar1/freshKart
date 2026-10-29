import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, beforeEach } from 'vitest';

import { HttpServiceService } from './http-service.service';

describe('HttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule , RouterTestingModule]
  }));

  it('should be created', () => {
    const service: HttpServiceService = TestBed.inject(HttpServiceService);
    expect(service).toBeTruthy();
  });
});
