import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { FilterComponent } from './filter.component';
import { translateTestProviders } from '../testing/translate-test.providers';

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
});
