import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomsComponent } from './rooms.component';
import { RoomsDataService } from 'src/app/core/services/rooms.service';
import { of } from 'rxjs';
import { RoomFilter } from 'src/app/core/models/rooms-resources.model';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { Router } from '@angular/router';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomsDataServiceStub: Partial<RoomsDataService>;
  let router: Router;

  beforeEach(async () => {
    roomsDataServiceStub = {
      rooms$: of([]),
      sortBy$: of(null),
      isLoading$: of(false),
      filter$: of(null),
      updateSortBy: jasmine.createSpy('updateSortBy'),
      updateFilters: jasmine.createSpy('updateFilters'),
      loadRooms: jasmine.createSpy('loadRooms'),
      reset: jasmine.createSpy('reset')
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RoomsComponent],
      providers: [
        { provide: RoomsDataService, useValue: roomsDataServiceStub }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle sort change', () => {
    component.onSortChange('column', SortType.Ascending);
    expect(roomsDataServiceStub.updateSortBy).toHaveBeenCalledWith('column', SortType.Ascending);
  });

  it('should handle search click', () => {
    const filter = { startDate: new Date(), endDate: new Date() } as RoomFilter;
    component.onSearchClick(filter);
    expect(roomsDataServiceStub.updateFilters).toHaveBeenCalledWith(filter);
    expect(roomsDataServiceStub.loadRooms).toHaveBeenCalledWith(filter);
  });

  it('should navigate on click', async () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    await component.onClick(123);
    expect(navigateSpy).toHaveBeenCalledWith('/room/123');
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component['destroyed$'], 'next');
    spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroyed$'].next).toHaveBeenCalled();
    expect(component['destroyed$'].complete).toHaveBeenCalled();
  });
});
