import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todoList: Todo[] = []
  @Output() updateList = new EventEmitter<Todo[]>()


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

    this.updateParent();
    console.log(this.todoList)
  }

  updateParent() {
    this.updateList.emit(this.todoList)
  }  
}
