import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../services/data.service';
import { HttpServiceService } from '../services/http-service.service';
import { CartModel } from '../models/cart.model';
import { CartViewModel } from '../models/view-model/cart.view-model';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { SortComponent } from '../sort/sort.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  imports: [CommonModule, FilterComponent, SortComponent, CarouselComponent, TranslatePipe]
})

export class CatalogueComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  arrayOfItems: Product[] = [];
  itemLength: any;
  discountPrice: any;
  id: string;
  catalogueLoading = false;
  message: any;
  noFilteredItems = false;
  searchQuery = '';
  private filteredItems: Product[] = [];
  public vm: CartViewModel = new CartViewModel();
  constructor(
    private httpService: HttpServiceService,
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.dataService.productSearch$.pipe(takeUntil(this.destroy$))
      .subscribe(query => this.searchProducts(query));
    this.translate.onLangChange.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.applyProductSearch());
    this.getCatalogueItems();
    setTimeout(() => {
      this.catalogueLoading = false;
      this.changeDetector.markForCheck();
    }, 1500);
    this.catalogueLoading = true;
  }

 public getCatalogueItems() {
    this.httpService.getProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: products => {
        this.filteredItems = products.map(product => ({
          ...product,
          discountedPrice: product.price - Math.ceil(product.discount * product.price / 100)
        }));
        this.itemLength = this.filteredItems.length;
        this.applyProductSearch();
        this.dataService.changeMessage(this.filteredItems);
      },
      error: error => {
        console.error('Error fetching product list:', error);
        this.filteredItems = [];
        this.itemLength = 0;
        this.applyProductSearch();
      }
    });
  }
  addToCart(id: number) {
    const item = this.arrayOfItems.find(element => element.id === id);
    if (item) {
      const cartItem: CartModel = {
        ...item,
        name: item.translationKey,
        discountedPrice: item.discountedPrice
          ?? item.price - Math.ceil(item.discount * item.price / 100),
        quantity: 1
      };
      this.dataService.addToCart(cartItem);
    }
  }

  decreaseQuantity(id: number) {
    this.dataService.decreaseQuantity(id);
  }

  getQuantity(id: number) {
    return this.dataService.getQuantity(id);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  receiveMessage(event) {
    setTimeout(() => {
      this.catalogueLoading = false;
      this.changeDetector.markForCheck();
    }, 1500);
    this.filteredItems = event.slice();
    this.applyProductSearch();
    this.catalogueLoading = true;
  }

  searchProducts(query: string) {
    this.searchQuery = query;
    this.applyProductSearch();
  }

  private applyProductSearch() {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    this.arrayOfItems = this.filteredItems.filter(item => {
      if (!query) {
        return true;
      }

      const productName = this.translate.instant(item.translationKey);
      const categoryName = item.category
        ? this.translate.instant('filter.categories.' + item.category)
        : '';
      return [productName, categoryName, item.translationKey]
        .some(value => String(value).toLocaleLowerCase().includes(query));
    });
    this.noFilteredItems = this.arrayOfItems.length === 0;
  }

  filterStatus(event) {
    this.noFilteredItems = event || this.arrayOfItems.length === 0;
  }
}
