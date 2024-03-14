import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomDetailsComponent } from './room-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RoomDto } from 'src/app/core/models/rooms-resources.model';
import { RoomType } from 'src/app/core/enums/room-type.enum';
import { FormsModule } from '@angular/forms';
import { RoomsDataService } from 'src/app/core/services/rooms.service';
import { ReservationsDataService } from 'src/app/core/services/reservations.service';

describe('RoomDetailsComponent', () => {
  let component: RoomDetailsComponent;
  let fixture: ComponentFixture<RoomDetailsComponent>;
  let route: ActivatedRoute;
  let roomsDataService: RoomsDataService;
  let reservationDataService: ReservationsDataService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ roomId: 1 }) } },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: RoomsDataService, useValue: { roomById: jasmine.createSpy('roomById').and.returnValue(of(mockRoomData)) } },
        { provide: ReservationsDataService, useValue: { createReservation: jasmine.createSpy('createReservation') } }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    roomsDataService = TestBed.inject(RoomsDataService);
    reservationDataService = TestBed.inject(ReservationsDataService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with room details', () => {
    expect(component.room).toEqual(mockRoomData);
  });

  it('should generate correct image name', () => {
    expect(component.imageName(RoomType.DELUXE)).toBe('double-room.jpg');
    expect(component.imageName(RoomType.STANDARD)).toBe('single-room.jpg');
    expect(component.imageName(RoomType.SUITE)).toBe('suite-room.jpg');
  });

  it('should submit reservation form and create reservation', async () => {
    const form = { valid: true, form: { markAllAsTouched: jasmine.createSpy('markAllAsTouched') } };
    await component.onSubmit(form as any);
    expect(reservationDataService.createReservation).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/reservations`);
  });
});

const mockRoomData = {
  id: 1,
  price: 10,
  roomNumber: '100',
  type: RoomType.DELUXE
} as RoomDto;
