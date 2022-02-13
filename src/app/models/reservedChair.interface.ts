export interface ReservedChair {
  id: Id;
}
export interface Id {
  chairId: number;
  reservationPresentationRoomId: number;
  reservationPresentationSchedule: string;
  reservationUserId: number;
}
