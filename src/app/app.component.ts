import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  constructor(translate: TranslateService, title: Title, meta: Meta) {
    translate.onLangChange.subscribe(() => {
      translate.get(['app.title', 'app.description']).subscribe(translations => {
        title.setTitle(translations['app.title']);
        meta.updateTag({ name: 'description', content: translations['app.description'] });
      });
    });
    translate.use('en').subscribe();
  }
}
