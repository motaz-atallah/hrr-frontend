import { RoomType } from "../enums/room-type.enum";
import { ReservationDto } from "./reservations-resources.model";

export class BaseRoomDto {
    roomNumber: string;
    type: RoomType;
    price: number;
    amenities: string[];

    constructor(roomNumber: string, type: RoomType, price: number, amenities: string[]) {
        this.roomNumber = roomNumber;
        this.type = type;
        this.price = price;
        this.amenities = amenities;
    }
}

export interface RoomDto extends BaseRoomDto {
    id: number;
    reservations: ReservationDto[];
}

export interface CreateRoomDto extends BaseRoomDto {
}

export interface UpdateRoomDto extends BaseRoomDto {
}

export interface RoomFilter {
    roomNumber: string;
    type: RoomType;
    price: number;
    startDate: Date;
    endDate: Date;
}
