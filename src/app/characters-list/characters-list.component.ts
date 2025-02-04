import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpsonsService } from '../servicio/simpsons.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css'],
})
export class CharactersListComponent implements OnInit {
  private simpsonsService = inject(SimpsonsService);

  characters: any[] = []; // Lista original de personajes
  searchQuery: string = ''; // Texto de búsqueda
  sortOption: string = 'name'; // Opción de orden

  ngOnInit() {
    this.simpsonsService.getCharacters().subscribe(data => {
      this.characters = data; // Guardamos los personajes cuando llegan de la API
    });
  }

  // Método para actualizar el texto de búsqueda
  updateSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  // Método para actualizar la opción de orden
  updateSort(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
  }

  // Filtrar y ordenar personajes dinámicamente
  get filteredCharacters(): any[] {
    return this.characters
      .filter(character =>
        character.Nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortOption === 'name') return a.Nombre.localeCompare(b.Nombre);
        if (this.sortOption === 'gender') return a.Genero.localeCompare(b.Genero);
        if (this.sortOption === 'status') return a.Estado.localeCompare(b.Estado);
        if (this.sortOption === 'occupation') return a.Ocupacion.localeCompare(b.Ocupacion);
        return 0;
      });
  }
}
