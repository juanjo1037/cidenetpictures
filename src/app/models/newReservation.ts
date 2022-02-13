export interface newReservation {
  email: string;
  idMovie: number;
  idRoom: number;
  schedule: string;
  chairsNumber: number;
  rows?: (string)[] | null;
  columns?: (number)[] | null;
}
