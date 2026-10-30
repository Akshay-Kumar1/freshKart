import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { FilterComponent } from './filter.component';
import { translateTestProviders } from '../testing/translate-test.providers';

function checkboxChange(checked: boolean): Event {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  const event = new Event('change');
  Object.defineProperty(event, 'target', { value: input });
  return event;
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: translateTestProviders
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show items at or below the selected maximum price', () => {
    component.arrayOfItemsToSort = [
      { id: 1, discountedPrice: 80 },
      { id: 2, discountedPrice: 120 }
    ];
    component.ngOnInit();
    component.sliderEvent(100);

    let filteredItems;
    component.messageEvent.subscribe(items => filteredItems = items);
    component.filterItems();

    expect(filteredItems).toEqual([{ id: 1, discountedPrice: 80 }]);
  });

  it('should filter by selected categories and maximum price', () => {
    component.arrayOfItemsToSort = [
      { id: 1, category: 'chips', discountedPrice: 80 },
      { id: 2, category: 'chocolate', discountedPrice: 90 },
      { id: 3, category: 'chips', discountedPrice: 120 }
    ];
    component.ngOnInit();
    component.sliderEvent(100);

    let filteredItems;
    component.messageEvent.subscribe(items => filteredItems = items);
    component.toggleCategory('chocolate', checkboxChange(true));
    component.filterItems();

    expect(component.categories).toEqual(['chips', 'chocolate']);
    expect(filteredItems).toEqual([{ id: 2, category: 'chocolate', discountedPrice: 90 }]);
  });

  it('should include products from any selected category', () => {
    component.arrayOfItemsToSort = [
      { id: 1, category: 'chips', discountedPrice: 80 },
      { id: 2, category: 'chocolate', discountedPrice: 90 },
      { id: 3, category: 'noodles', discountedPrice: 120 }
    ];
    component.ngOnInit();

    let filteredItems;
    component.messageEvent.subscribe(items => filteredItems = items);
    component.toggleCategory('chips', checkboxChange(true));
    component.toggleCategory('chocolate', checkboxChange(true));
    component.filterItems();

    expect(filteredItems).toEqual([
      { id: 1, category: 'chips', discountedPrice: 80 },
      { id: 2, category: 'chocolate', discountedPrice: 90 }
    ]);
  });

  it('should reset the price and categories and emit all products', () => {
    const products = [
      { id: 1, category: 'chips', discountedPrice: 80 },
      { id: 2, category: 'chocolate', discountedPrice: 90 }
    ];
    component.arrayOfItemsToSort = products;
    component.ngOnInit();
    component.sliderEvent(50);
    component.toggleCategory('chips', checkboxChange(true));

    let filteredItems;
    let noResults;
    component.messageEvent.subscribe(items => filteredItems = items);
    component.filterEvent.subscribe(isEmpty => noResults = isEmpty);
    component.resetFilters();

    expect(component.value).toBe(600);
    expect(component.selectedCategories).toEqual([]);
    expect(filteredItems).toEqual(products);
    expect(noResults).toBe(false);
  });
});
