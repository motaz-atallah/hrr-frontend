import { RoomType } from "../enums/room-type.enum";

export function ImageName(type: RoomType): string {
    switch (type) {
        case RoomType.DELUXE:
            return 'double-room.jpg';
        case RoomType.STANDARD:
            return 'single-room.jpg';
        case RoomType.SUITE:
            return 'suite-room.jpg';
    }
}