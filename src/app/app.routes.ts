import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { AlumnadoComponent } from './alumnado/alumnado.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'alumnado', component: AlumnadoComponent }
];
