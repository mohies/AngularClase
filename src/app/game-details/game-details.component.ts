import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawgService } from '../servicio/rawg.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: any;

  constructor(private route: ActivatedRoute, private rawgService: RawgService) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.rawgService.getGameDetails(gameId).subscribe(response => {
        this.game = response;
      });
    }
  }
}
