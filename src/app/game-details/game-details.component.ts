import { Component, OnInit } from '@angular/core';
import { RawgService } from '../servicio/rawg.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: any;

  constructor(private rawgService: RawgService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del juego desde la URL
    this.route.params.subscribe(param => {
      const gameId = param['id']; // Saca el ID desde la URL
      if (gameId) {
        // llama a la API para obtener detalles del juego
        this.rawgService.getGameDetails(gameId).subscribe(response => {
          this.game = response; // Guarda la info del juego
        });
      }
    });

  }
}
