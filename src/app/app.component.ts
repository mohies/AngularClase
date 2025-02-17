import { Component, inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './servicio/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = null;
  private platformId = inject(PLATFORM_ID); // Detectar si estamos en el navegador

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Suscribirse a los cambios de autenticación y usuario
      this.authService.isAuthenticated.subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });

      this.authService.username.subscribe(name => {
        this.username = name;
      });
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/home']); // Redirigir al home después de iniciar sesión
      },
      error: () => {
        console.error('Error en login');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir después de logout
  }
}
