// game-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawgService } from '../servicio/rawg.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  currentPage: number = 1;
  pageSize: number = 21;
  searching: boolean = false;

  constructor(private rawgService: RawgService, private router: Router) { }

  ngOnInit(): void {
    // Método que carga los juegos desde el servicio rawgService

    // Llamamos al método getGames del servicio rawgService.
    // Este método hace una petición HTTP para obtener una lista de juegos.
    // Se le pasan como parámetros la página actual y el tamaño de la página.
    this.rawgService.getGames(this.currentPage, this.pageSize)

      // Nos suscribimos al observable, lo que significa que esperamos la respuesta de la API.
      // Cuando la respuesta llega, ejecutamos la función dentro de subscribe.
      .subscribe(response => {

        // Extraemos los resultados de la respuesta y los guardamos en la variable 'games'.
        this.games = response.results;
      });
  }

  nextPage(): void {
    this.currentPage++;

  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  verDetalles(gamesId: number) {
    this.router.navigate(["/game", gamesId])
  }

  buscarJuego(event: any): void {

    const nombreJuego= event.target.value;
    if (nombreJuego.trim() !== '') {
      this.searching = true; // 🔄 Indicar que está en modo búsqueda
      this.rawgService.filterJuego(nombreJuego,this.currentPage).subscribe(response => {
        this.games = response.results;
        console.log(response);
      });
    } else {
      this.ngOnInit() // Si el campo está vacío, recarga la lista normal
    }
  }



}