import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModel } from '../models/cart.model';

const CART_STORAGE_KEY = 'freshkart.cart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private productSearchSource = new BehaviorSubject('');
  productSearch$ = this.productSearchSource.asObservable();

  private cartInfo = new BehaviorSubject<CartModel[]>(this.loadCart());
  cartItems$ = this.cartInfo.asObservable();

  constructor() { }

  changeMessage(data: any) {
    this.messageSource.next(data);
  }

  setProductSearch(query: string) {
    this.productSearchSource.next(query);
  }

  getProductSearch() {
    return this.productSearchSource.getValue();
  }

  addToCart(item: CartModel) {
    const currentItems = this.cartInfo.getValue();
    const existingItem = currentItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      this.updateQuantity(item.id, existingItem.quantity + 1);
      return;
    }

    this.updateCart([...currentItems, { ...item, quantity: 1 }]);
  }

  decreaseQuantity(itemId: number) {
    const existingItem = this.cartInfo.getValue().find(item => item.id === itemId);
    if (!existingItem) {
      return;
    }

    if (existingItem.quantity <= 1) {
      this.removeFromCart(itemId);
      return;
    }

    this.updateQuantity(itemId, existingItem.quantity - 1);
  }

  removeFromCart(itemId: number) {
    this.updateCart(this.cartInfo.getValue().filter(item => item.id !== itemId));
  }

  getCartItems() {
    return this.cartInfo.getValue();
  }

  getQuantity(itemId: number) {
    return this.cartInfo.getValue().find(item => item.id === itemId)?.quantity ?? 0;
  }

  private updateQuantity(itemId: number, quantity: number) {
    this.updateCart(this.cartInfo.getValue().map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  }

  private updateCart(items: CartModel[]) {
    this.cartInfo.next(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Unable to persist cart contents:', error);
    }
  }

  private loadCart(): CartModel[] {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!savedCart) {
        return [];
      }

      const cart: unknown = JSON.parse(savedCart);
      if (!Array.isArray(cart)) {
        throw new Error('Stored cart data is not an array');
      }
      return cart as CartModel[];
    } catch (error) {
      console.error('Unable to restore cart contents:', error);
      return [];
    }
  }
}
