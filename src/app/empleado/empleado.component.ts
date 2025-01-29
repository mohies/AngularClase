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
  public empleadoExt: Empleado;
  public trabajador: Array<any>;
  public trabajadorExterno:boolean;
  public empleado: Empleado;  // Asegúrate de que este es el tipo correcto

  constructor() {
    this.empleado = new Empleado('Juan Pérez', 47);
    this.empleadoExt= new Empleado("Pedro",47)
    this.trabajador=[new Empleado("Marta",47),
                     new Empleado("Ana",43),
                     new Empleado("Alejandro",38)
    ]
    this.trabajadorExterno=true;
  }

  ngOnInit() {
    console.log(this.empleado);
  }
}
