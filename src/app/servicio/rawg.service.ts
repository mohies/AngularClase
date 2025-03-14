// rawg.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawgService {
  private baseUrl = 'https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385';

  constructor(private http: HttpClient) {}

  getGames(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}&page=${page}&page_size=${pageSize}`);
  }

  getGameDetails(gameId: string): Observable<any> {
    return this.http.get<any>(`https://api.rawg.io/api/games/${gameId}?key=e908d77142574a35945bc55e7711e385`);
  }

  filterJuego(nombreJuego: string, page:number): Observable<any> {
    const url = `https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385&page=${page}&search=${encodeURIComponent(nombreJuego)}`;
    return this.http.get<any>(url);
}


getGamesByPlatform(page: number, pageSize: number, platformId: string): Observable<any> {
  const url = `https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385&page=${page}&page_size=${pageSize}&platforms=${platformId}`;
  return this.http.get<any>(url);
}



}