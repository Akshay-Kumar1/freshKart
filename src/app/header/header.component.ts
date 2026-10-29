import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

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
  }

  changeLanguage(event: Event) {
    const language = (event.target as HTMLSelectElement).value;
    this.selectedLanguage = language;
    this.translate.use(language).subscribe();
  }

}
