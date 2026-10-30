import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private productSearchSource = new BehaviorSubject('');
  productSearch$ = this.productSearchSource.asObservable();

  private cartInfo = new BehaviorSubject<CartModel[]>([]);
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

    this.cartInfo.next([...currentItems, { ...item, quantity: 1 }]);
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
    this.cartInfo.next(this.cartInfo.getValue().filter(item => item.id !== itemId));
  }

  getCartItems() {
    return this.cartInfo.getValue();
  }

  getQuantity(itemId: number) {
    return this.cartInfo.getValue().find(item => item.id === itemId)?.quantity ?? 0;
  }

  private updateQuantity(itemId: number, quantity: number) {
    this.cartInfo.next(this.cartInfo.getValue().map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  }
}
