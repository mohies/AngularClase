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
  pageSize: number = 20;

  constructor(private rawgService: RawgService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.rawgService.getGames(this.currentPage, this.pageSize).subscribe(response => {
      this.games = response.results;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadGames();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGames();
    }
  }

  viewGameDetails(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }
}