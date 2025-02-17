import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/favorites/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const username = 'admin';  // ⚠ Reemplaza con credenciales reales
    const password = 'admin';
    const encodedCredentials = btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json'
    });
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addFavorite(itemId: number, itemName: string): Observable<any> {
    return this.http.post(this.apiUrl + 'add/', { item_id: itemId, item_name: itemName }, { headers: this.getAuthHeaders() });
  }

  removeFavorite(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}remove/${itemId}/`, { headers: this.getAuthHeaders() });
  }
}
