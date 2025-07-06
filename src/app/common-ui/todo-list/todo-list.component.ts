import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(this.getApiUrl()).subscribe({
      next: (data) => {
        this.todoList = data;
      },
      error: (err) => console.error('Ошибка загрузки', err),
    });
  }

  addTodo(title: string) {
    this.http.post<Todo>(this.getApiUrl(), { title: title }).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => console.error('Ошибка добавления:', err),
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.getApiUrl()}/${id}`).subscribe({
      next: () => {
        // Удаляем задачу из локального массива (без перезагрузки)
        this.todoList = this.todoList.filter((todo) => todo.id !== id);
      },
      error: (err) => console.error('Ошибка удаления:', err),
    });
  }

  changeStatusTodo(id: number) {
    const activeTodo = this.todoList.filter((todo) => todo.id === id);
    this.http
      .patch(`${this.getApiUrl()}/${id}`, { completed: !activeTodo[0].completed })
      .subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (err) => console.log('failed patching todo', err),
      });
  }

  updateList() {
    const data = this.todoList;
    this.emitter.emit(data);
  }

  private getApiUrl(): string {
    return 'http://localhost:3000/todos';
  }
}
