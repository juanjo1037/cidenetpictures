export interface Presentation {
  id: Id;
  movie: Movie;
  available:boolean;
}
export interface Id {
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
}
