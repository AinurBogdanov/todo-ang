import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TodoListComponent } from '../../common-ui/todo-list/todo-list.component';
import { Todo } from '../../interfaces/todo';
import { StorageService } from '../../services/storage/storage.service';
import { ThemesService } from '../../services/themes/themes.service';
import { Theme } from '../../interfaces/themes';
import { RegisterComponent } from "../../common-ui/register.component/register.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TodoListComponent, RegisterComponent, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  showRegisterForm: boolean = false;

  todos: Todo[] = [];
  @ViewChild('input') todoInput!: ElementRef<HTMLInputElement>;
  @ViewChild(TodoListComponent) todoListComponent!:TodoListComponent

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  addTodo(title: string) {
    if(this.todoListComponent) {
     this.todoListComponent.addTodo(title);
    }
  }

  constructor(private storageService: StorageService, private themeServise: ThemesService) {
    this.todos = this.storageService.loadFromStorage()
  }


  onUpdate(data: Todo[]) {
    this.todos = data;
  };

  setTheme(theme: Theme) {
    this.themeServise.setTheme(theme);
  };
}


