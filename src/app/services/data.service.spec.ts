import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, beforeEach } from 'vitest';

import { DataService } from './data.service';
import { CartModel } from '../models/cart.model';

describe('DataService', () => {
  beforeEach(() => {
    localStorage.removeItem('freshkart.cart');
    TestBed.configureTestingModule({
      providers: [ DataService ],
      imports: [HttpClientModule , RouterTestingModule],
    });
  });

  it('should be created', () => {
    const service: DataService = TestBed.inject(DataService);
    expect(service).toBeTruthy();
  });

  it('should increment and decrement quantities for the same item', () => {
    const service = TestBed.inject(DataService);
    const item = { id: 1, price: 20, discountedPrice: 19 } as CartModel;

    service.addToCart(item);
    service.addToCart(item);
    expect(service.getQuantity(1)).toBe(2);

    service.decreaseQuantity(1);
    expect(service.getQuantity(1)).toBe(1);

    service.decreaseQuantity(1);
    expect(service.getQuantity(1)).toBe(0);
    expect(service.getCartItems()).toEqual([]);
  });

  it('should keep different products as separate cart entries', () => {
    const service = TestBed.inject(DataService);
    service.addToCart({ id: 1 } as CartModel);
    service.addToCart({ id: 2 } as CartModel);

    expect(service.getCartItems().map(item => item.id)).toEqual([1, 2]);
  });

  it('should restore cart items and quantities after the service is recreated', () => {
    const service = TestBed.inject(DataService);
    const item = { id: 1, price: 20, discountedPrice: 19 } as CartModel;
    service.addToCart(item);
    service.addToCart(item);

    const restoredService = new DataService();

    expect(restoredService.getCartItems()).toEqual([{ ...item, quantity: 2 }]);
  });

  it('should clear persisted cart data when the last quantity is removed', () => {
    const service = TestBed.inject(DataService);
    service.addToCart({ id: 1 } as CartModel);
    service.removeFromCart(1);

    expect(JSON.parse(localStorage.getItem('freshkart.cart') || '[]')).toEqual([]);
  });
});
