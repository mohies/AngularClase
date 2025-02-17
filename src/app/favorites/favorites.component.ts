import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../servicio/favorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (err) => {
        console.error('Error al obtener favoritos', err);
      },
    });
  }

  removeFavorite(itemId: number) {
    this.favoriteService.removeFavorite(itemId).subscribe(() => {
      this.favorites = this.favorites.filter((fav) => fav.item_id !== itemId);
    });
  }
}
