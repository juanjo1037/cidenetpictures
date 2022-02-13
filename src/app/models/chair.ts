export interface Chair {
  id: number;
  row: string;
  column: number;
  room: Room;
}
export interface Room {
  id: number;
  capacity: number;
  rowsNumber: number;
  columnsNumber: number;
}
