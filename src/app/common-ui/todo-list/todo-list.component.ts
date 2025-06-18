import { Component, Input } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todoList: Todo[] = []
  
  constructor(private storageService: StorageService) {}

  markAsDone(todo: Todo) {
    todo.isDone = !todo.isDone;

    this.storageService.saveToStorage(this.todoList);
  }
  
  deleteTodo(todo: Todo) {
    const id = todo.id 
    const newList = this.todoList.filter((todo) => {
      return todo.id !== id;
    });

    this.todoList = newList;
    this.storageService.saveToStorage(this.todoList);
    //сделать эмит события для того чтобы туду удалялся из обоих переменных
  }

}
