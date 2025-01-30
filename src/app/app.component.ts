import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';  // Importa EmpleadoComponent
import { AlumnadoComponent } from './alumnado/alumnado.component';  // Importa AlumnadoComponent

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [EmpleadoComponent, AlumnadoComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
