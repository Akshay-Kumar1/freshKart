import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CatalogueComponent } from './catalogue.component';
import { translateTestProviders } from '../testing/translate-test.providers';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceService } from '../services/user-service.service';
import { DataService } from '../services/data.service';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueComponent, HttpClientModule, RouterTestingModule],
      providers: translateTestProviders
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search product names and categories without losing the active filters', () => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', {
      products: { kurkure: 'Kurkure', kitkat: 'Kitkat' },
      filter: { categories: { chips: 'Chips', chocolate: 'Chocolate' } }
    });
    vi.spyOn(TestBed.inject(UserServiceService), 'getItems').mockReturnValue([
      { id: 1, category: 'chips', translationKey: 'products.kurkure', price: 20, discount: 0, img_url: '' },
      { id: 2, category: 'chocolate', translationKey: 'products.kitkat', price: 10, discount: 0, img_url: '' }
    ]);
    component.getCatalogueItems();

    TestBed.inject(DataService).setProductSearch('CHIPS');

    expect(component.arrayOfItems.map(item => item.id)).toEqual([1]);

    TestBed.inject(DataService).setProductSearch('');

    expect(component.arrayOfItems.map(item => item.id)).toEqual([1, 2]);
  });

});
