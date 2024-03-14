import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardComponent } from './room-card.component';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCardComponent, CapitalizePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
