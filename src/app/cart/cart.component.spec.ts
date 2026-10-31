import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { DataService } from '../services/data.service';
import { CartModel } from '../models/cart.model';
import { TranslateService } from '@ngx-translate/core';
import { translateTestProviders } from '../testing/translate-test.providers';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: translateTestProviders
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.removeItem('freshkart.cart');
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { cart: { emptyTitle: 'Your cart seems empty !' } });
    translate.use('en').subscribe();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the selected item into the cart', () => {
    const item = Object.assign(new CartModel(), {
      id: 1,
      translationKey: 'products.kurkure',
      price: 20,
      discountedPrice: 19,
      discount: 5
    });
    TestBed.inject(DataService).addToCart(item);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.cartArray).toEqual([{ ...item, quantity: 1 }]);
  });

  it('should calculate totals using item quantities', () => {
    const dataService = TestBed.inject(DataService);
    const item = Object.assign(new CartModel(), {
      id: 2,
      translationKey: 'products.kitkat',
      price: 20,
      discountedPrice: 18,
      discount: 10
    });
    dataService.addToCart(item);
    dataService.addToCart(item);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.cartArray[0].quantity).toBe(2);
    expect(component.totalPrice).toBe(40);
    expect(component.totalDiscount).toBe(4);
    expect(component.totalPayable).toBe(36);
  });

  it('should show the empty-cart message when no item is selected', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Your cart seems empty');
  });

  it('should keep the cart heading visible in dark mode', () => {
    document.body.classList.add('dark-theme');
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('.cart-heading h1');
    expect(getComputedStyle(heading).color).toBe('rgb(243, 244, 246)');

    document.body.classList.remove('dark-theme');
  });
});
