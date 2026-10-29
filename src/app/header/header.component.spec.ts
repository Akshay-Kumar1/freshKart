import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartModel } from '../models/cart.model';
import { DataService } from '../services/data.service';

import { HeaderComponent } from './header.component';
import { translateTestProviders } from '../testing/translate-test.providers';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientModule, RouterTestingModule],
      providers: translateTestProviders
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to English and offer all supported languages', () => {
    const languageSelect = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const languageCodes = Array.from(languageSelect.options).map(option => option.value);

    expect(languageSelect.value).toBe('en');
    expect(languageCodes).toEqual(['en', 'de', 'ja', 'fr', 'it', 'es']);
  });

  it('should load the selected language', () => {
    const useLanguage = vi.spyOn(TestBed.inject(TranslateService), 'use').mockReturnValue(of({}));
    const languageSelect = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    languageSelect.value = 'fr';
    languageSelect.dispatchEvent(new Event('change'));

    expect(useLanguage).toHaveBeenCalledWith('fr');
    expect(component.selectedLanguage).toBe('fr');
  });

  it('should display the total quantity in the cart badge', () => {
    const dataService = TestBed.inject(DataService);
    const item = Object.assign(new CartModel(), { id: 1 });
    dataService.addToCart(item);
    dataService.addToCart(item);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.cart-count').textContent.trim()).toBe('2');
  });
});
