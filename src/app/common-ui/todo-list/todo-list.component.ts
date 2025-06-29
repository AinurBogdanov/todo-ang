import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todoList: Todo[] = [];
  @Output() emiter = new EventEmitter<Todo[]>();
  
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.loadTodos()
  } 

  private getApiUrl():string {
    return 'http://localhost:3000/todos';
  }
  
  loadTodos() {
    this.http.get<Todo[]>(this.getApiUrl())
    .subscribe({
      next: (data) => {
        this.todoList = data,
        console.log(this.todoList);
      },
      error: (err) => console.error('Ошибка загрузки' , err)
    });
    console.log(this.todoList.map(todo => todo.id));
  }

  addTodo(title: string) {
    this.http.post<Todo>(this.getApiUrl(), { title: title }).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => console.error('Ошибка добавления:', err)
    });
    console.log('todoAdded')
  }  

  deleteTodo(id: number) {
    this.http.delete(`${this.getApiUrl()}/${id}`).subscribe({
      next: () => {
        // Удаляем задачу из локального массива (без перезагрузки)
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      },
      error: (err) => console.error('Ошибка удаления:', err)
    });
  }

  changeStatusTodo(id: number) {
    const activeTodo =  this.todoList.filter(todo => todo.id === id);
    this.http.patch(
      `${this.getApiUrl()}/${id}`,
      { completed:  !activeTodo[0].completed }
    ).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => console.log('faild patching todo', err)
    });
  
    console.log('status changed')
  }
  
  updateList() {
    const data = this.todoList;
    this.emiter.emit(data)
    
  }
}