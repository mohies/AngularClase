// empleado.component.ts
import { Component, OnInit } from '@angular/core';
import { Empleado } from './Empleado';
import { OnepieceService } from '../on/onepiece.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  public title = "Bienvenido Empleado";
  public empleadoExt: Empleado;
  public trabajador: Empleado[];
  public trabajadorExterno: boolean;
  public empleado: Empleado;
  public characters: any[] = [];
  public errorMessage: string = '';

  constructor(private onePieceService: OnepieceService) {
    this.empleado = new Empleado('Juan Pérez', 47);
    this.empleadoExt = new Empleado("Pedro", 47);
    this.trabajador = [
      new Empleado("Marta", 47),
      new Empleado("Ana", 43),
      new Empleado("Alejandro", 38)
    ];
    this.trabajadorExterno = true;
  }

  ngOnInit() {
    console.log(this.empleado);
    this.getOnePieceCharacters();
  }

  // Método en otro componente para obtener los personajes y manejar los resultados
  getOnePieceCharacters() {
    // Llama al método getCharacters() del servicio OnepieceService y se suscribe al Observable
    this.onePieceService.getCharacters().subscribe({
      // Si la solicitud es exitosa, asigna los personajes obtenidos a la propiedad characters
      next: (result) => this.characters = result,
      // Si hay un error, asigna un mensaje de error a la propiedad errorMessage
      error: () => this.errorMessage = 'Error al cargar los personajes de One Piece'
    });
  }
}