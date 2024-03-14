
export class BaseReservationDto {
    roomId: number;
    startDate: Date;
    endDate: Date;
    guestName: string;
    createdBy: string;
    totalPrice: number;

    constructor(roomId: number, startDate: Date, endDate: Date, guestName: string, totalPrice: number) {
        this.roomId = roomId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.guestName = guestName;
        this.totalPrice = totalPrice;
    }
}

export interface ReservationDto extends BaseReservationDto {
    id: number;
}


export interface CreateReservationDto extends BaseReservationDto {
}

export interface UpdateReservationDto extends BaseReservationDto {
}

export interface ReservationFilter {
    guestName: string;
    roomId: number;
    createdBy: string;
    currentReservation: boolean;
}
