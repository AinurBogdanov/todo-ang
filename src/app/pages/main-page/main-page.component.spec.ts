import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { StorageService } from '../../services/storage/storage.service';
import { ThemesService } from '../../services/themes/themes.service';
import { Todo } from '../../interfaces/todo';
import { TodoListComponent } from '../../common-ui/todo-list/todo-list.component';
import { ElementRef } from '@angular/core';

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

  it('should create', () => {
    expect(component).toBeTruthy();
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
    })
  });
});
