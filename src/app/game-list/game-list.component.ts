// game-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawgService } from '../servicio/rawg.service';
import { response } from 'express';
import { debug } from 'console';

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
  ultimabusqueda: string='';
  ordenActual: string='nombre'

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
        this.ordenarPor(this.ordenActual)
        
      });
      
     
  }

  buscarJuego(event: any): void {
    debugger;
    const nombreJuego = event.target.value.trim();
    if (nombreJuego !== '') {
      this.searching = true; //para hacer que esta en modo busqueda
      this.ultimabusqueda=nombreJuego;
      this.rawgService.filterJuego(nombreJuego, this.currentPage).subscribe(response => {
        this.games = response.results;
        console.log(this.games);
      });
    } else {
      this.ngOnInit() //que se cargue todo de nuevo
    }
  }

  //Otra funcion de buscar la cual le pasamos la busqueda principal que le hemos hecho que lo que hace es que nos guarda el input  de la funcion principal
  buscarJuegoDirecto(juego:string){
    this.rawgService.filterJuego(juego,this.currentPage).subscribe(response=>{
      this.games=response.results
    })
  }

  nextPage(): void {
    this.currentPage++;
    if (this.searching == false) {
      this.ngOnInit();
    }else{
      this.buscarJuegoDirecto(this.ultimabusqueda)
    }


  }

  prevPage(): void {

    if (this.currentPage > 1) {
      this.currentPage--;
    }
    if (this.searching == false) {
      this.ngOnInit();
    }else{
      this.buscarJuegoDirecto(this.ultimabusqueda)
    }


  }

  verDetalles(gamesId: number) {
    this.router.navigate(["/game", gamesId])
  }

  ordenarPor(event: any): void {
    this.ordenActual = event.value;
    if (event.target.value === 'nombre') {
      this.games.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === 'rating') {
      this.games.sort((a, b) => b.rating - a.rating); 
    } else if (event.target.value === 'metacritic') {
      this.games.sort((a, b) => b.metacritic - a.metacritic); 
    }
  }



 


}