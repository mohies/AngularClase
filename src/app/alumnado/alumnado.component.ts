import { Component } from '@angular/core';
import { Alumnado } from './alumnado';

@Component({
  selector: 'app-alumnado',
  imports: [],
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.css']
})
export class AlumnadoComponent {

    alumnadoDaw : Array<Alumnado>;

    cursoSeleccionado = 1;
    constructor(){
      this.alumnadoDaw=[ new Alumnado(
        'Juan',
        'Pérez López',
        '12345678A',
        '2000-05-10',
        'Madrid',
        '612345678',
        1,
        ['Programación', 'Bases de Datos', 'Lenguajes de marcas']
      ),new Alumnado(
        'Ana',
        'González García',
        '87654321B',
        '1999-08-22',
        'Valencia',
        '612345679',
        2,
        ['Programación', 'Entornos de desarrollo', 'Bases de Datos']
      )]


    }

    ngOnInit(){
      console.log(this.alumnadoDaw)
    }

    cargarAlumnos(curso: number) {
      this.cursoSeleccionado = curso;
    }
}
