import { Component } from '@angular/core';
import { Empleado } from './Empleado';
@Component({
  selector: 'app-empleado',
  imports: [],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  public title = "Bienvenido Empleado";
  public empleado: Empleado;  // Asegúrate de que este es el tipo correcto

  constructor() {
    this.empleado = new Empleado('Juan Pérez', 47);
  }

  ngOnInit() {
    console.log(this.empleado);
  }
}
