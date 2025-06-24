import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Todo } from '../../interfaces/todo';

describe('StorageService', () => {
  let service: StorageService;
  let mockTodos: Todo[] = [
    { id: '1', task: 'Test task 1', isDone: false},
    { id: '2', task: 'Test task 2', isDone: true}
  ];

  beforeEach(() => {
    service = new StorageService();

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  })
  
  describe('save to storage', () => {
    it('should have todos in localStorage', () => {
      service.saveToStorage(mockTodos);

      const rawData = localStorage.getItem('todoList');
      expect(rawData).toBeTruthy();

      const savedTodos = JSON.parse(rawData as string);
      expect(savedTodos).toEqual(mockTodos);
    });
  });

  describe('load from storage', () => {
    it('should load saved todos', () => {
      service.saveToStorage(mockTodos);

      const loadedTodos = service.loadFromStorage();

      expect(loadedTodos).toEqual(mockTodos);
    });

    it('should return if key does`t exists', () => {
      localStorage.clear();

      const serviceResponse = service.loadFromStorage();

      expect(serviceResponse).toEqual([]);
    });
  });

  describe('clear storage', () => {
    it('should clear storage', () => {
      service.clearStorage();

      expect(localStorage.getItem('todoList')).toEqual(null);
    });
  });
});
