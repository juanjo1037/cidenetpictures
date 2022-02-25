export interface Reservation {
  id: Id;
  chairsNumber: number;
  price: number;
  presentation: Presentation;
}
export interface Id {
  presentationRoomId: number;
  presentationSchedule: string;
  userId: number;
}
export interface Presentation {
  id: Id1;
  movie: Movie;
  isAvailable:boolean;
}
export interface Id1 {
  roomId: number;
  schedule: string;
}
export interface Movie {
  id: number;
  title: string;
  genre: string;
  synopsis: string;
  image: string;
  format: string;
  duration: string;
  price: number;
  billboard: boolean;
  backDropImg: string;
}
