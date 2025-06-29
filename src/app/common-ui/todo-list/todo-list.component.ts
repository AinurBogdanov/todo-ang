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

  ngOnInit() {
    this.loadTodos();
    console.log(this.todoList)
  } 

  private getApiUrl():string {
    return 'http://localhost:3000/todos';
  }
  
  loadTodos() {
    this.http.get<Todo[]>(this.getApiUrl())
    .subscribe({
      next: (data) => this.todoList = data,
      error: (err) => console.error('Ошибка загрузки' , err)
    });
  }

  addTodo(title: string) {
    this.http.post<Todo>(this.getApiUrl(), { title: title }).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => console.error('Ошибка добавления:', err)
    });
    console.log('good')
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

  updateList() {
    const data = this.todoList;
    this.emiter.emit(data)
  }
}
