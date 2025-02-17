import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicio/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ IMPORTA HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Llamada al servicio de autenticación
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.username) {
            // Guardamos el usuario en localStorage si el login es exitoso
            localStorage.setItem('user', JSON.stringify(response));
            this.authService.usernameSubject.next(response.username); // Actualizamos el nombre del usuario
            this.authService.authStatus.next(true); // Actualizamos el estado de autenticación
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          this.errorMessage = 'Credenciales incorrectas';
        }
      });
    }
  }
}
