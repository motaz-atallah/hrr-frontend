import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { RoomFilter } from 'src/app/core/models/rooms-resources.model';
import { of } from 'rxjs';
import { RoomType } from 'src/app/core/enums/room-type.enum';
import { RoomsDataService } from 'src/app/core/services/rooms.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;
  let roomsDataService: RoomsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: RoomsDataService, useValue: { updateFilters: jasmine.createSpy('updateFilters'), loadRooms: jasmine.createSpy('loadRooms').and.returnValue(of(null)) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    roomsDataService = TestBed.inject(RoomsDataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update filters and load rooms on click', async () => {
    const filter = {
      roomNumber: '',
      type: RoomType.STANDARD,
      price: 0,
      startDate: new Date(),
      endDate: new Date(),
    } as RoomFilter;
    await component.onclick(filter);
    expect(roomsDataService.updateFilters).toHaveBeenCalledWith(filter);
    expect(roomsDataService.loadRooms).toHaveBeenCalledWith(filter);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/rooms');
  });
});
