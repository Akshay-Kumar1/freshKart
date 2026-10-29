import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { CartViewModel } from '../models/view-model/cart.view-model';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { SortComponent } from '../sort/sort.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  imports: [CommonModule, FilterComponent, SortComponent, CarouselComponent, TranslatePipe]
})

export class CatalogueComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  arrayOfItems: any;
  itemLength: any;
  discountPrice: any;
  id: string;
  catalogueLoading = false;
  message: any;
  noFilteredItems = false;
  public vm: CartViewModel = new CartViewModel();
  constructor(
    private userService: UserServiceService,
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getCatalogueItems();
    setTimeout(() => {
      this.catalogueLoading = false;
      this.changeDetector.markForCheck();
    }, 1500);
    this.catalogueLoading = true;
  }

 public getCatalogueItems() {
      let data = this.userService.getItems()
      this.arrayOfItems = data;
      this.dataService.changeMessage(this.arrayOfItems);
      this.itemLength = Object.keys(data).length;
      for (let i = 0 ; i <  this.itemLength; i++) {
        this.discountPrice = (data[i].discount * data[i].price) / 100;
        // tslint:disable-next-line:no-string-literal
        data[i]['discountedPrice'] = data[i].price - Math.ceil(this.discountPrice);
        // data[i]['discountAmount'] = data[i].price - data[i].discountedPrice;
      }

  }
  addToCart(id: number) {
    const item = this.arrayOfItems.find(element => element.id === id);
    if (item) {
      this.dataService.addToCart(item);
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
    this.arrayOfItems = event;
    this.catalogueLoading = true;
  }
  filterStatus(event) {
    this.noFilteredItems = event;
  }
}
