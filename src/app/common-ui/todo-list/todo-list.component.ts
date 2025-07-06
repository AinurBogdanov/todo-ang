import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todoList: Todo[] = [];
  @Output() emitter = new EventEmitter<Todo[]>();

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  private lastId = 1;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    if (this.authService.isAuthenticated()) {
      this.http.get<Todo[]>(this.getApiUrl()).subscribe({
        next: (data) => {
          this.todoList = data;
        },
        error: (err) => console.error('error', err),
      });
    } else {
      this.todoList = this.storageService.loadFromStorage();
    }
  }

  addTodo(title: string) {
    if (this.authService.isAuthenticated()) {
      this.http.post<Todo>(this.getApiUrl(), { title: title }).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (err) => console.error('error', err),
      });
    } else {
      const newTodo: Todo = {
        id: this.getNextId(),
        title,
        completed: false,
      };

      this.todoList.push(newTodo);

      this.storageService.saveToStorage(this.todoList);
    }
  }

  deleteTodo(id: number) {
    if (this.authService.isAuthenticated()) {
      this.http.delete(`${this.getApiUrl()}/${id}`).subscribe({
        next: () => {
          this.todoList = this.todoList.filter((todo) => todo.id !== id);
        },
        error: (err) => console.error('error', err),
      });
    } else {
      this.todoList = this.todoList.filter((todo) => {
        return todo.id !== id;
      });
      this.storageService.saveToStorage(this.todoList);
    }
  }

  changeStatusTodo(id: number) {
    const activeTodo = this.todoList.filter((todo) => todo.id === id);

    if (this.authService.isAuthenticated()) {
      this.http
        .patch(`${this.getApiUrl()}/${id}`, { completed: !activeTodo[0].completed })
        .subscribe({
          next: () => {
            this.loadTodos();
          },
          error: (err) => console.log('failed patching todo', err),
        });
    } else {
      const index = this.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todoList[index].completed = !this.todoList[index].completed;
      }
    }
  }

  private getApiUrl(): string {
    return 'http://localhost:3000/todos';
  }
  private getNextId(): number {
    return ++this.lastId;
  }
}
