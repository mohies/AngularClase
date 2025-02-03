// onepiece.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnepieceService {
  // Define la URL de la API que se usará para obtener los personajes de One Piece
  private apiUrl = 'https://apisimpsons.fly.dev/api/personajes?limit=400';

  // Inyecta el servicio HttpClient en el constructor para hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener los personajes de One Piece desde la API
  getCharacters(): Observable<any[]> {
    // Hace una solicitud HTTP GET a la URL de la API y devuelve un Observable que emite una matriz de personajes
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.docs) // Extrae el array de "docs"
    );
  }
}