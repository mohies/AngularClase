import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'home', component: HomeComponent },
  { path: 'characters', component: CharactersListComponent }, // Página específica

  
];
