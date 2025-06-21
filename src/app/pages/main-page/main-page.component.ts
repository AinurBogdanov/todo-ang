import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodoListComponent } from "../../common-ui/todo-list/todo-list.component";
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { ThemesService } from '../../services/themes/themes.service';
import { Theme } from '../../interfaces/themes';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  todos: Todo[] = [];
  @ViewChild('input') todoInput!: ElementRef<HTMLInputElement>;

  constructor(private storageService: StorageService, private themeServise: ThemesService) {
    this.todos = this.storageService.loadFromStorage()
  }


  addTodo(task: string) {
    if(!task.trim()) {
      alert('enter task') 
      return
    }
    const newTodo = {
      id: uuidv4(),
      task: task,
      isDone: false
    };
    
    this.todoInput.nativeElement.value = '';

    this.todos = [...this.todos, newTodo];
    this.storageService.saveToStorage(this.todos)
  }

  onUpdate(newVal: Todo[]) {
    this.todos = newVal
  }

  setTheme(theme: Theme) {
    this.themeServise.setTheme(theme);
  }
}


