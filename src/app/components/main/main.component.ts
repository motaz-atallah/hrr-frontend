import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsDataService } from 'src/app/core/services/rooms.service';
import { RoomFilter } from 'src/app/core/models/rooms-resources.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private readonly roomsDataService: RoomsDataService,
    private readonly router: Router) {
  }
  slides: any[] = [
    {
      url: '/assets/images/photo-slide-1.jpg',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: '/assets/images/photo-slide-2.jpg',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: '/assets/images/photo-slide-3.jpg',
      title: 'Third slide',
      description: 'This is the third slide',
    },
    {
      url: '/assets/images/photo-slide-4.jpg',
      title: 'Fourth slide',
      description: 'This is the fourth slide',
    },
    {
      url: '/assets/images/photo-slide-5.jpg',
      title: 'Fifth slide',
      description: 'This is the fifth slide',
    },
  ];

  async onclick(filter: RoomFilter) {
    this.roomsDataService.updateFilters(filter);
    this.roomsDataService.loadRooms(filter);
    await this.router.navigateByUrl('/rooms');
  }
}
