import { Component } from '@angular/core';
import { TodoListComponent } from "../../common-ui/todo-list/todo-list.component";
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-main-page',
  imports: [TodoListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  todos: Todo[] = [];

  constructor(private storageService: StorageService) {
    this.todos = this.storageService.loadFromStorage()
  }


  addTodo(task: string) {
    const newTodo = {
      id: this.todos.length + 1,
      task: task,
      isDone: false
    };
    this.todos = [...this.todos, newTodo];
    this.storageService.saveToStorage(this.todos)
  }

  onUpdate(newVal: Todo[]) {
    this.todos = newVal
  }
}


