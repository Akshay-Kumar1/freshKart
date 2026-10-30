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

  it('should return the original products and additional snack and chocolate options', () => {
    const products = TestBed.inject(UserServiceService).getItems();

    expect(products).toHaveLength(8);
    expect(products.slice(0, 4).map(product => product.translationKey)).toEqual([
      'products.kurkure',
      'products.kitkat',
      'products.celebrations',
      'products.maggi'
    ]);
    expect(products.slice(4).map(product => product.translationKey)).toEqual([
      'products.masalaChips',
      'products.saltedChips',
      'products.milkChocolate',
      'products.chocolateWafer'
    ]);
    expect(products.map(product => product.category)).toEqual([
      'chips',
      'chocolate',
      'chocolate',
      'noodles',
      'chips',
      'chips',
      'chocolate',
      'biscuits'
    ]);
    expect(new Set(products.map(product => product.id)).size).toBe(products.length);
    expect(products.slice(4).every(product => product.img_url && product.price > 0)).toBe(true);
  });
});
