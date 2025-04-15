import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl = 'http://localhost:8080/api/menu-items'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createWithImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/with-image`, formData);
  }

  update(id: number, menuItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, menuItem);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
