import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';  // Importa EmpleadoComponent

@Component({
  selector: 'app-root',
  imports: [EmpleadoComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  standalone: true
})
export class AppComponent {

}
