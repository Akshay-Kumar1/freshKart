import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [CommonModule, FormsModule, TranslatePipe]
})
export class FilterComponent implements OnInit {
  @Input() arrayOfItemsToSort: any[] = [];
  @Output() messageEvent = new EventEmitter<any[]>();
  @Output() filterEvent = new EventEmitter<boolean>();
  value = 600;
  categories: string[] = [];
  selectedCategories: string[] = [];
  private allItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.allItems = this.arrayOfItemsToSort.slice();
    this.categories = Array.from(new Set(this.allItems.map(item => item.category).filter(Boolean)));
  }

  sliderEvent(value: number) {
    this.value = value;
  }

  toggleCategory(category: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCategories = checked
      ? [...this.selectedCategories, category]
      : this.selectedCategories.filter(selectedCategory => selectedCategory !== category);
  }

  resetFilters() {
    this.value = 600;
    this.selectedCategories = [];
    this.filterItems();
  }

  filterItems() {
    const filteredItems = this.allItems.filter(item =>
      item.discountedPrice <= this.value &&
      (!this.selectedCategories.length || this.selectedCategories.includes(item.category))
    );
    this.messageEvent.emit(filteredItems);
    this.filterEvent.emit(filteredItems.length === 0);
  }
}
