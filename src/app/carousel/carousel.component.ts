import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UserServiceService } from '../services/user-service.service';

interface CarouselSlide {
  image: string;
  theme: string;
  discount: number;
  copyKey: string;
}

@Component({
  standalone: true,
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, TranslatePipe]
})
export class CarouselComponent implements OnInit, OnDestroy {
  readonly carouselSlides: CarouselSlide[];
  currentCarouselIndex = 0;
  private carouselTimer: ReturnType<typeof setInterval>;

  get currentCarouselSlide() {
    return this.carouselSlides[this.currentCarouselIndex];
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    userService: UserServiceService
  ) {
    this.carouselSlides = userService.getItems()
      .filter(item => item.discount > 0)
      .map(item => ({
        image: item.img_url,
        theme: item.category === 'chips' ? 'carousel-snacks' : 'carousel-' + item.category,
        discount: item.discount,
        copyKey: item.translationKey.replace('products.', '')
      }));
  }

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
