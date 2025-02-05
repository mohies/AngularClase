import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    RouterOutlet, 
    GameListComponent, // Nuevo Componente
    FooterComponent,
    HomeComponent
  ],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Aplicación Angular';
}
