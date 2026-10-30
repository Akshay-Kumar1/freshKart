import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

const THEME_STORAGE_KEY = 'freshkart-theme';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterLink, TranslatePipe]
})
export class HeaderComponent implements OnInit {
  readonly languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'fr', name: 'French' },
    { code: 'it', name: 'Italian' },
    { code: 'es', name: 'Spanish' }
  ];
  selectedLanguage = 'en';
  isDarkMode = true;
  searchQuery = '';
  readonly cartItemCount$ = this.dataService.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor(
    public router: Router,
    private translate: TranslateService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.translate.getCurrentLang() || 'en';
    this.searchQuery = this.dataService.getProductSearch();
    this.isDarkMode = localStorage.getItem(THEME_STORAGE_KEY) !== 'light';
    this.applyTheme();
  }

  searchProducts(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataService.setProductSearch(this.searchQuery);
  }

  changeLanguage(event: Event) {
    const language = (event.target as HTMLSelectElement).value;
    this.selectedLanguage = language;
    this.translate.use(language).subscribe();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(THEME_STORAGE_KEY, this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    document.body.classList.toggle('light-theme', !this.isDarkMode);
  }

}
