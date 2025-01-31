import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Importa RouterModule
import { EmpleadoComponent } from './empleado/empleado.component';
import { AlumnadoComponent } from './alumnado/alumnado.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [
    RouterModule, 
    RouterOutlet, 
    EmpleadoComponent,
    AlumnadoComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent
  ],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
