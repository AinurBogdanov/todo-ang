import { Theme } from '../../interfaces/themes';
import { ThemesService } from './themes.service';
import { Renderer2, RendererFactory2 } from '@angular/core';

describe('ThemesService', () => {
  let service: ThemesService;

  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;
  let mockDocument: Document;

  beforeEach(() => {
    // мокируем рендерер 
    renderer = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);

    rendererFactory = jasmine.createSpyObj('RenderFactory2', ['createRenderer']);
    (rendererFactory.createRenderer as jasmine.Spy).and.returnValue(renderer);

    // МОКИРУЕМ ДОКУМЕНТ
    mockDocument = document;


    spyOn(localStorage, 'setItem');
    
    //ПЕРЕДАЕМ В КОНСТРУКТОР СЕРВИСА ФАЛЬШИВЫЙ РЕНДЕРЕРФАКТОРИ
    service = new ThemesService(rendererFactory);
  });

  describe('setTheme()', () => {
    it('should remove all theme classes before adding new one', () => {
      service.setTheme('blue-theme');

      expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'blue-theme');
      expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'green-theme');
      expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'white-theme');
    });

    it('should add correct theme class to body', () => {
      const theme: Theme = 'green-theme';
      service.setTheme(theme);

      expect(renderer.addClass).toHaveBeenCalledWith(document.body, theme)
    });
  });
});
