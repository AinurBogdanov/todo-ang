import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'todoList';

  saveToStorage(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  loadFromStorage(): Todo[] {
    const rawData = localStorage.getItem(this.STORAGE_KEY);
    if(rawData === null) return []; 
    return JSON.parse(rawData);
  }

  clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
