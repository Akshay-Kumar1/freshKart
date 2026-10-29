import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [FormsModule, TranslatePipe]
})
export class FilterComponent implements OnInit {
  @Input() arrayOfItemsToSort: any[] = [];
  @Output() messageEvent = new EventEmitter<any[]>();
  @Output() filterEvent = new EventEmitter<boolean>();
  value = 600;
  private allItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.allItems = this.arrayOfItemsToSort.slice();
  }

  sliderEvent(value: number) {
    this.value = value;
  }

  filterItems() {
    const filteredItems = this.allItems.filter(item => item.discountedPrice <= this.value);
    this.messageEvent.emit(filteredItems);
    this.filterEvent.emit(filteredItems.length === 0);
  }
}
