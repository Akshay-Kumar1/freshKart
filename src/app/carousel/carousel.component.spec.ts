import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CarouselComponent } from './carousel.component';
import { translateTestProviders } from '../testing/translate-test.providers';

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
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should move between banners in both directions', () => {
    component.showNextSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-snacks');

    component.showPreviousSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-celebrations');

    component.showPreviousSlide();
    expect(component.currentCarouselSlide.theme).toBe('carousel-comfort');
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
