import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RawgService } from '../servicio/rawg.service';
import { FavoriteService } from '../servicio/favorite.service';
import { AuthService } from '../servicio/auth.service';
import { Observable } from 'rxjs';
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
  selectedPlatformImage: string = '';
  favorites = new Set<number>();
  
  isAuthenticated: boolean = false; 

  constructor(
    private rawgService: RawgService,
    private router: Router,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.cargarJuegos();
    
    // 🔥 Convertimos el Observable en un valor normal
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isAuthenticated = isAuth; // ⚡ Se actualiza cuando cambia la autenticación
      if (isAuth) {
        this.cargarFavoritos();
      } else {
        this.favorites.clear(); // Si no está autenticado, se vacía favoritos
      }
    });
  }

  cargarJuegos(): void {
    this.route.queryParams.subscribe(params => {
      const platformId = params['platform'];

      if (platformId) {
        this.rawgService.getGamesByPlatform(this.currentPage, this.pageSize, platformId)
          .subscribe(response => {
            this.games = response.results;
            this.actualizarImagenPlataforma(platformId);
            if (this.ordenActual) {
              this.ordenarPor(this.ordenActual);
            }
          });
      } else {
        this.rawgService.getGames(this.currentPage, this.pageSize)
          .subscribe(response => {
            this.games = response.results;
            if (this.ordenActual) {
              this.ordenarPor(this.ordenActual);
            }
          });
        this.selectedPlatformImage = '';
      }
    });
  }

  cargarFavoritos(): void {
    this.favoriteService.getFavorites().subscribe(data => {
      this.favorites = new Set(data.map(fav => fav.item_id));
    });
  }

  toggleFavorite(game: any) {
    if (this.favorites.has(game.id)) {
      this.favoriteService.removeFavorite(game.id).subscribe(() => {
        this.favorites.delete(game.id);
      });
    } else {
      this.favoriteService.addFavorite(game.id, game.name).subscribe(() => {
        this.favorites.add(game.id);
      });
    }
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
      this.cargarJuegos();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.cargarJuegos();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarJuegos();
    }
  }

  verDetalles(gamesId: number) {
    this.router.navigate(["/game", gamesId]);
  }

  ordenarPor(event: any): void {
    let criterio;
    if(event.target) {
      criterio = event.target.value;
    } else {
      criterio = event;
    }

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

  actualizarImagenPlataforma(platformId: string) {
    const platformImages: { [key: string]: string } = {
      '4': 'https://i.blogs.es/3f45c4/pcpotente-ap/1366_2000.jpeg',
      '18': 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/09/ps4-pro-buena.jpg?tf=3840x',
      '1': 'https://media.game.es/COVERV2/3D_L/115/115159.png',
      '7': 'https://m.media-amazon.com/images/I/81IQp9uUdRL._AC_UF894,1000_QL80_.jpg',
    };
    this.selectedPlatformImage = platformImages[platformId];
  }
}
