import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { CartModel } from '../models/cart.model';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, TranslatePipe]
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartArray: CartModel[] = [];
  disCountPriceCart: any;
  id: any;
  removeCart = false;
  loading = false;
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  ngOnInit() {
    this.dataService.cartItems$.pipe(take(1)).subscribe((cartItems: CartModel[]) => {
      this.cartArray = cartItems;
    });
  }

  addQuantity(id: number) {
    const item = this.cartArray.find(cartItem => cartItem.id === id);
    if (item) {
      this.dataService.addToCart(item);
      this.refreshCart();
    }
  }

  decreaseQuantity(id: number) {
    this.dataService.decreaseQuantity(id);
    this.refreshCart();
  }

  removeItem(id: number) {
    this.dataService.removeFromCart(id);
    this.refreshCart();
  }

  get totalPrice() {
    return this.cartArray.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get cartItemCount() {
    return this.cartArray.reduce((total, item) => total + item.quantity, 0);
  }

  get totalDiscount() {
    return this.cartArray.reduce(
      (total, item) => total + (item.price - item.discountedPrice) * item.quantity,
      0
    );
  }

  get totalPayable() {
    return this.cartArray.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);
  }

  private refreshCart() {
    this.cartArray = this.dataService.getCartItems();
  }
  redirectToCatalogue() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigateByUrl('catalogue');
    }, 1500);
  }
}
