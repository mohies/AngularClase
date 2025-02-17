import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  private isBrowser: boolean;
  public authStatus: BehaviorSubject<boolean>;
  public usernameSubject: BehaviorSubject<string | null>;

  public isAuthenticated;
  public username;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const storedUser = this.isBrowser ? localStorage.getItem('user') : null;

    this.authStatus = new BehaviorSubject<boolean>(!!storedUser);
    this.isAuthenticated = this.authStatus.asObservable();

    this.usernameSubject = new BehaviorSubject<string | null>(storedUser ? JSON.parse(storedUser).username : null);
    this.username = this.usernameSubject.asObservable();
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password });
  }


  logout(): void {
    this.http.post<any>(`${this.apiUrl}/logout/`, {}).subscribe({
      next: () => {
        if (this.isBrowser) {
          localStorage.removeItem('user');
        }
        this.authStatus.next(false);
        this.usernameSubject.next(null);
      },
      error: (err) => {
        console.error("Error en logout:", err);
      }
    });
  }
}
