import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea global en tu aplicación.
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1'; // Aquí se encuentra tu API.

  // Creamos un "subject" que mantiene el estado de si el usuario está autenticado.
  private authStatus = new BehaviorSubject<boolean>(this.loadAuthStatus());
  isAuthenticated = this.authStatus.asObservable(); // Esto es para que otras partes del código puedan escuchar cambios en el estado de autenticación.

  // Creamos un "subject" para almacenar el nombre del usuario.
  private usernameSubject = new BehaviorSubject<string | null>(this.loadUsername());
  username = this.usernameSubject.asObservable(); // Igual que con la autenticación, otras partes pueden escuchar el nombre de usuario.

  constructor(
    private http: HttpClient,  // Para hacer peticiones HTTP
    @Inject(PLATFORM_ID) private platformId: Object // Esto nos permite saber si estamos en el navegador o en el servidor.
  ) {}

  // Método para cargar si el usuario está autenticado (esto solo debe suceder en el navegador)
  private loadAuthStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Verificamos si estamos en el navegador
      return !!localStorage.getItem('user'); // Si hay un usuario guardado en localStorage, devolvemos true.
    }
    return false; // Si estamos en el servidor, no podemos acceder a localStorage.
  }

  // Método para cargar el nombre de usuario (esto también solo se hace en el navegador)
  private loadUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user'); // Intentamos obtener el usuario guardado en localStorage.
      return user ? JSON.parse(user).username : null; // Si existe el usuario, devolvemos el nombre.
    }
    return null; // Si estamos en el servidor, no podemos obtener el nombre de usuario.
  }

  // Método para loguear al usuario. Hace una petición HTTP al backend.
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          // Solo guardamos los datos del usuario en localStorage si estamos en el navegador.
          localStorage.setItem('user', JSON.stringify(response));
        }
        this.authStatus.next(true); // Cambiamos el estado de autenticación a 'true'.
        this.usernameSubject.next(response.username); // Guardamos el nombre de usuario.
      })
    );
  }

  // Método para cerrar sesión. Limpia el almacenamiento local.
  logout() {
    return this.http.post<any>(`${this.apiUrl}/logout/`, {}).pipe(
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          // Solo eliminamos los datos de localStorage si estamos en el navegador.
          localStorage.removeItem('user');
        }
        this.authStatus.next(false); // Cambiamos el estado de autenticación a 'false'.
        this.usernameSubject.next(null); // Limpiamos el nombre de usuario.
      })
    );
  }
}
