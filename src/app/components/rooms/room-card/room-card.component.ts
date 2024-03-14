import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomType } from 'src/app/core/enums/room-type.enum';
import { ImageName } from 'src/app/core/services/utils';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent {
  @Input() price: number;
  @Input() name: string;
  @Input() type: RoomType;
  
  @Output() public click = new EventEmitter<void>();

  imageName(type: RoomType): string {
    return ImageName(type);
  }

  onClick() {
    this.click.emit();
  }
}
