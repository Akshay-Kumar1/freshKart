import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, TranslatePipe]
})
export class CarouselComponent implements OnInit, OnDestroy {
  readonly carouselSlides = [
    { image: './assets/celebrations.jpg', theme: 'carousel-celebrations' },
    { image: './assets/kurkure.jpg', theme: 'carousel-snacks' },
    { image: './assets/maggi.jpg', theme: 'carousel-comfort' }
  ];
  currentCarouselIndex = 0;
  private carouselTimer: ReturnType<typeof setInterval>;

  get currentCarouselSlide() {
    return this.carouselSlides[this.currentCarouselIndex];
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.carouselTimer = setInterval(() => this.showNextSlide(), 5000);
  }

  showPreviousSlide() {
    this.currentCarouselIndex =
      (this.currentCarouselIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
    this.changeDetector.markForCheck();
  }

  showNextSlide() {
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.carouselSlides.length;
    this.changeDetector.markForCheck();
  }

  showSlide(index: number) {
    this.currentCarouselIndex = index;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy() {
    clearInterval(this.carouselTimer);
  }
}
