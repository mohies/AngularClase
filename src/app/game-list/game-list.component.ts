import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  ultimabusqueda: string = '';
  ordenActual: string = '';
  selectedPlatformImage: string = ''; // URL de la imagen de la plataforma

  constructor(private rawgService: RawgService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const platformId = params['platform']; // Verifica si hay una plataforma en la URL

      if (platformId) {
        // Si hay un parámetro de plataforma, carga juegos de esa plataforma
        this.rawgService.getGamesByPlatform(this.currentPage, this.pageSize, platformId)
          .subscribe(response => {
            this.games = response.results;
            if (this.ordenActual) {
              this.ordenarPor(this.ordenActual);
            }
          });

        // ACTUALIZAR IMAGEN AL CAMBIAR DE PLATAFORMA
        this.actualizarImagenPlataforma(platformId);
        
      } else {
        // Si no hay plataforma, carga los juegos normalmente
        this.rawgService.getGames(this.currentPage, this.pageSize)
          .subscribe(response => {
            this.games = response.results;
            if (this.ordenActual) {
              this.ordenarPor(this.ordenActual);
            }
          });

        // Si no hay plataforma seleccionada, limpiar la imagen
        this.selectedPlatformImage = '';
      }
    });
  }

  buscarJuego(event: any): void {
    const nombreJuego = event.target.value.trim();
    if (nombreJuego !== '') {
      this.searching = true;
      this.ultimabusqueda = nombreJuego;
      this.rawgService.filterJuego(nombreJuego, this.currentPage).subscribe(response => {
        this.games = response.results;
        if (this.ordenActual) {
          this.ordenarPor(this.ordenActual);
        }
      });
    } else {
      this.ngOnInit();
    }
  }

  buscarJuegoDirecto(juego: string) {
    this.rawgService.filterJuego(juego, this.currentPage).subscribe(response => {
      this.games = response.results;
      if (this.ordenActual) {
        this.ordenarPor(this.ordenActual);
      }
    });
  }

  nextPage(): void {
    this.currentPage++;
    if (!this.searching) {
      this.rawgService.getGames(this.currentPage, this.pageSize)
        .subscribe(response => {
          this.games = response.results;
          if (this.ordenActual) {
            this.ordenarPor(this.ordenActual);
          }
        });
    } else {
      this.buscarJuegoDirecto(this.ultimabusqueda);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    if (!this.searching) {
      this.rawgService.getGames(this.currentPage, this.pageSize)
        .subscribe(response => {
          this.games = response.results;
          if (this.ordenActual) {
            this.ordenarPor(this.ordenActual);
          }
        });
    } else {
      this.buscarJuegoDirecto(this.ultimabusqueda);
    }
  }

  verDetalles(gamesId: number) {
    this.router.navigate(["/game", gamesId]);
  }

  ordenarPor(event: any): void {
    let criterio = event.target ? event.target.value : event;
    if (criterio !== '') {
      this.ordenActual = criterio;
      if (criterio === 'nombre') {
        this.games.sort((a, b) => a.name.localeCompare(b.name));
      } else if (criterio === 'rating') {
        this.games.sort((a, b) => b.rating - a.rating);
      } else if (criterio === 'metacritic') {
        this.games.sort((a, b) => b.metacritic - a.metacritic);
      }
    }
  }

  // 📌 FUNCION PARA ACTUALIZAR LA IMAGEN SEGÚN LA PLATAFORMA
  actualizarImagenPlataforma(platformId: string) {
    const platformImages: { [key: string]: string } = {
      '4': 'https://i.blogs.es/3f45c4/pcpotente-ap/1366_2000.jpeg', // PC
      '18': 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/09/ps4-pro-buena.jpg?tf=3840x', // PS4
      '1': 'https://media.game.es/COVERV2/3D_L/115/115159.png', // Xbox One
      '7': 'https://m.media-amazon.com/images/I/81IQp9uUdRL._AC_UF894,1000_QL80_.jpg', // Nintendo Switch
    };

    this.selectedPlatformImage = platformImages[platformId];
  }
}