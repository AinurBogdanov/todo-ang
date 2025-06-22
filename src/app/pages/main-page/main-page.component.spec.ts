import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { StorageService } from '../../services/storage/storage.service';
import { ThemesService } from '../../services/themes/themes.service';
import { Todo } from '../../interfaces/todo';
import { TodoListComponent } from '../../common-ui/todo-list/todo-list.component';
import { ElementRef } from '@angular/core';
import { Theme } from '../../interfaces/themes';
import { By } from '@angular/platform-browser';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let storageService: StorageService;
  let themesService: ThemesService

  const mockTodos: Todo[] = [
    { id: '1', task: 'Test task 1', isDone: false},
    { id: '2', task: 'Test task 2', isDone: true}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent, TodoListComponent],
      providers: [
        {
          provide: StorageService,
          useValue: {
            loadFromStorage: jasmine.createSpy('loadFromStorage').and.returnValue(mockTodos),
            saveToStorage: jasmine.createSpy('loadFromStorage')
          }
        },{
          provide: ThemesService,
          useValue: {
            setTheme:  jasmine.createSpy('setTheme')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageService = TestBed.inject(StorageService);
    themesService = TestBed.inject(ThemesService);
  });

  describe('Initialization', () => {
    it('should load todos from storage on itit', () => {
      expect(storageService.loadFromStorage).toHaveBeenCalled();
      expect(component.todos).toEqual(mockTodos);
    })
  });
  
  describe('addTodo', () => {
    it('should not add empty task', () => {
      spyOn(window, 'alert');
      component.addTodo('   ');
      expect(window.alert).toHaveBeenCalled();
      expect(component.todos).toEqual(mockTodos);
      expect(storageService.saveToStorage).not.toHaveBeenCalled();
    });

    it('should add new todo and clear input', () => {
      const newTask = 'New task'
      component.todoInput = { nativeElement: { value: newTask }} as ElementRef<HTMLInputElement>;
      
      component.addTodo(newTask);

      expect(component.todos.length).toEqual(3);
      expect(component.todos[2].task).toEqual(newTask);
      expect(component.todoInput.nativeElement.value).toEqual('');
      expect(storageService.saveToStorage).toHaveBeenCalledWith(component.todos);
    });
  });

  describe('on update', () => {
    it('should update todos array', () => {
      const newTodosArray = [
        { id: '1', task: 'Test task 1', isDone: false},
        { id: '2', task: 'Test task 2', isDone: true},
        { id: '3', task: 'Test task 3', isDone: false}
      ]
        
      component.onUpdate(newTodosArray);

      expect(component.todos).toBe(newTodosArray);
      expect(storageService.saveToStorage).toHaveBeenCalledWith(newTodosArray);
    });
  });

  describe('setTheme', () => {
    it('shlould set new theme',() => {
      const theme: Theme = 'white-theme';

      component.setTheme(theme);

      expect(themesService.setTheme).toHaveBeenCalledWith(theme);  
    });
  });

  describe('DOM interactions', () => {
    it('should call addTodo when fotm is submited', fakeAsync(() => {
      spyOn(component, 'addTodo');
      
      const input = fixture.debugElement.query(By.css('.todo-input'));
      const button = fixture.debugElement.query(By.css('.add-todo-btn'));

      expect(input).toBeTruthy('Input element not found');
      expect(button).toBeTruthy('Button element not Found')

      input.nativeElement.value = 'Test task';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    
      button.triggerEventHandler('click', null)
      tick(); 

      expect(component.addTodo).toHaveBeenCalledWith('Test task');
    }));

    it('should render todos in TodoListComponent', () => {
      const todoListComponent = fixture.debugElement.query(By.directive(TodoListComponent));

      expect(todoListComponent).toBeTruthy();
      expect(todoListComponent.componentInstance.todoList).toEqual(mockTodos);
    });

    it('should have referance to input element via ViewChild', () => {
      const inputElement = fixture.debugElement.query(By.css('.todo-input')).nativeElement;
      component.todoInput.nativeElement = inputElement;

      expect(component.todoInput).toBeDefined();
      expect(component.todoInput.nativeElement.classList.contains('todo-input')).toBeTrue();
    });
  });

  describe('Correct DOM rendering', () => {
    it('should display correct place holder in input', () => {
      const inputElement = fixture.debugElement.query(By.css('.todo-input')).nativeElement;
      expect(inputElement.placeholder).toBe('Add a task.');
    });

    it('should have correct button text', () => {
      const button = fixture.debugElement.query(By.css('.add-todo-btn'));

      expect(button.nativeElement.textContent.trim()).toBe('I Got This!')
    })
  });
});
