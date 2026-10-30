import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CarouselComponent } from './carousel.component';
import { translateTestProviders } from '../testing/translate-test.providers';
import { UserServiceService } from '../services/user-service.service';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent],
      providers: translateTestProviders
    }).compileComponents();
  });

  beforeEach(() => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { catalogue: { discountOff: '{{discount}}% off' } });
    translate.use('en');
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should move between banners in both directions', () => {
    component.showNextSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-chocolate');

    component.showPreviousSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-snacks');

    component.showPreviousSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-biscuits');
  });

  it('should only show products with a discount', () => {
    const discountedProducts = TestBed.inject(UserServiceService).getItems()
      .filter(product => product.discount > 0);

    expect(component.carouselSlides.map(slide => slide.image))
      .toEqual(discountedProducts.map(product => product.img_url));
    expect(component.carouselSlides.every(slide => slide.discount > 0)).toBe(true);
    expect(fixture.nativeElement.querySelector('.carousel-discount-badge').textContent).toContain('5%');
  });

  it('should automatically advance banners every five seconds', () => {
    vi.useFakeTimers();
    const carouselFixture = TestBed.createComponent(CarouselComponent);
    const carousel = carouselFixture.componentInstance;
    carouselFixture.detectChanges();

    vi.advanceTimersByTime(4999);
    expect(carousel.currentCarouselIndex).toBe(0);

    vi.advanceTimersByTime(1);
    expect(carousel.currentCarouselIndex).toBe(1);

    carouselFixture.destroy();
    vi.useRealTimers();
  });
});
