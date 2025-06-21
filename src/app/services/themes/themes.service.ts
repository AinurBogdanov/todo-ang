import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../../interfaces/themes'

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private render: Renderer2;
  private currentTheme = 'blue-theme';

  constructor(renderFactory: RendererFactory2) {
    this.render = renderFactory.createRenderer(null, null);
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    
    this.render.removeClass(document.body, 'blue-theme');
    this.render.removeClass(document.body, 'green-theme');
    this.render.removeClass(document.body, 'white-theme');
    
    
    this.render.addClass(document.body, theme);
  
    localStorage.setItem('theme', theme);
  }
}
