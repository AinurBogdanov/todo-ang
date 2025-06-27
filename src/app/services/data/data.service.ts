import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { };
  private headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  baseUrl = 'http://localhost:3000/'


  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}todos`);
  }
  postData() {
    this.http.post(
      `${this.baseUrl}todos`,
      { "title": "Новая задача", "completed": false },
      { headers: this.headers }
    ).subscribe(res => {
      console.log('data is added', res)
    })
  }
}
