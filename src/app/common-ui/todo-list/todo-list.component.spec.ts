// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TodoListComponent } from './todo-list.component';
// import { StorageService } from '../../services/storage/storage.service';
// import { Todo } from '../../interfaces/todo';
// import { MainPageComponent } from '../../pages/main-page/main-page.component';
// import { By } from '@angular/platform-browser';


// describe('TodoListComponent', () => {
// // НЕОБХОДИМЫЕ КОМПОНЕНТЫ
//   let todoListComponent: TodoListComponent;
//   let mainPageComponent: MainPageComponent;
//   let storageService: StorageService;
  
//   let mainPageFixture: ComponentFixture<MainPageComponent>; // Фикстура
 

//   // MOCK ЗНАЧЕНИЯ
//   let mockTodos: Todo[] = [
//     { id: '1', task: 'Test task 1', isDone: false},
//     { id: '2', task: 'Test task 2', isDone: true}
//   ] 

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TodoListComponent, MainPageComponent], // Импорт необходимого компонента
//       providers: [
//         {
//           provide: StorageService,
//           useValue: {
//             loadFromStorage: jasmine.createSpy('loadFromStorage').and.returnValue(mockTodos),
//             saveToStorage: jasmine.createSpy('saveToStorage')
//           }  
//         }
//       ]  // мокаем StorageService 
//     })
//     .compileComponents();
//     mainPageFixture = TestBed.createComponent(MainPageComponent); // Создание фикстуры



//     //ОБЬЯВЛЯЕМ КОМПОНЕНТЫ НЕОБХОДИМЫЕ ДЛЯ ТЕСТОВ
//     storageService = TestBed.inject(StorageService);  
//     mainPageComponent = mainPageFixture.componentInstance;
//     todoListComponent = mainPageFixture.debugElement
//     .query(By.directive(TodoListComponent))
//     .componentInstance; //Доставание из фикстуры 
    

//     mainPageFixture.detectChanges(); // Запуск обнаружения изменений
//   });


//   // САМИ ТЕСТЫ
//   it('should receive initial todos from parent via @Input()', () => {
//     expect(todoListComponent.todoList).toEqual(mainPageComponent.todos);
//     expect(todoListComponent.todoList).toEqual(mockTodos);
//   });

//   it('should mark todo as done', () => {
//     const todo = todoListComponent.todoList[0]
//     expect(todo.isDone).toBeFalse;

//     todoListComponent.markAsDone(todo);      
//     expect(todo.isDone).toBeTrue();
//   });

//   it('should delete todo', () => {
//     const todo = todoListComponent.todoList.filter((todo) =>  todo.id = '1')
//     expect(todo[0]).toEqual(todoListComponent.todoList[0]);
  
//     todoListComponent.deleteTodo(todo[0]);
//     expect(todoListComponent.todoList.filter((todo) =>  todo.id = '1')).toEqual([]);
//   })
// });
