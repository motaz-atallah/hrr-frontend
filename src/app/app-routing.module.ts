import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MainComponent } from './components/main/main.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AuthGuard } from './core/gurds/auth.gurd';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'room/:roomId',
    component: RoomDetailsComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations',
    component: ReservationsComponent, 
    canActivate: [AuthGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
