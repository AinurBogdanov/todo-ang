// Ипорт рендерера
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../../interfaces/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  // Создаем переменную для рендерера
  private render: Renderer2;

  renderFactory = inject(RendererFactory2);

  constructor() {
    // Создаеться рендерер
    this.render = this.renderFactory.createRenderer(null, null);
  }

  setTheme(theme: Theme) {
    // используем методы рендерера
    this.render.removeClass(document.body, 'blue-theme');
    this.render.removeClass(document.body, 'green-theme');
    this.render.removeClass(document.body, 'white-theme');

    this.render.addClass(document.body, theme);

    localStorage.setItem('theme', theme);
  }
}
