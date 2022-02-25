import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chair } from 'src/app/models/chair';
import { Movies } from 'src/app/models/movies';
import { ReservedChair } from 'src/app/models/reservedChair.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chair-reservation',
  templateUrl: './chair-reservation.component.html',
  styleUrls: ['./chair-reservation.component.scss'],

})
export class ChairReservationComponent implements OnInit {

  chairs: Chair[]=[];
  reservedChairs: ReservedChair[]=[];
  subs: Subscription[]=[];
  rows:string[]=[];
  columns:number[]=[];
  rowsSelected:string[]=[];
  columnsSelected:number[]=[];
  auxSelected: string[] = [];
  @Input() idRoom:number;
  @Input() schedule:string;
  @Input() movie:Movies;
  @Input() userId:number;
  price:number;

  constructor(private apiService:ApiService,
     private tokenService:TokenService,
     private modal:NgbModal,
     private router:Router,
     ) { }

  ngOnInit(): void {
    this.subs.push(this.apiService.getChairsByRoom(this.idRoom).subscribe(data =>{
      this.chairs = data;
      this.getRowsAndColumns();
      this.subs.push(this.apiService.getReservedChairsByRoom(this.idRoom, this.schedule).subscribe(data=>{
        this.reservedChairs=data;
        this.getUsersReservedChairs();
        this.price= this.auxSelected.length*this.movie.price;
        console.log(data);
      }))
    }));
  }

  closeModal() {
    this.modal.dismissAll();
  }
  open(content: any) {
    this.modal.open(content);
  }
getChairId(row:string, column:number):number{

  let id= this.chairs.find(chair=>chair.row===row&&chair.column===column).id
 return id;
}
getStatus(rowSelected:string,colSelected:number) {
  if(this.reservedChairs.find(reservedChair=>reservedChair.id.chairId== this.getChairId(rowSelected,colSelected) && reservedChair.id.reservationUserId!=this.userId)) {
      return 'reserved';
  } else if(this.auxSelected.indexOf(rowSelected + colSelected) !== -1) {
      return 'selected';
  }


}

getRowsAndColumns(){

  for (let chair of this.chairs) {
    if (!this.rows.includes(chair.row)) {
      this.rows.push(chair.row);
    }

    if (!this.columns.includes(chair.column)) {
      this.columns.push(chair.column);
    }
  }
}
getUsersReservedChairs(){
  for (let reservedChair of this.reservedChairs){
    if(reservedChair.id.reservationUserId==this.userId){
      let row=this.chairs.find(chair=>chair.id==reservedChair.id.chairId).row;
      let column=this.chairs.find(chair=>chair.id==reservedChair.id.chairId).column;
      this.rowsSelected.push(row);
      this.columnsSelected.push(column);
      this.auxSelected.push(row+column);

    }
  }
}
clearSelected() {
    this.rowsSelected = [];
    this.columnsSelected = [];
    this.auxSelected = [];
}

seatClicked (rowSelected: string, columnSelected:number) {
  let indexRow = this.rowsSelected.indexOf(rowSelected);
  let indexCol = this.columnsSelected.indexOf(columnSelected);
  let indexAux = this.auxSelected.indexOf(rowSelected + columnSelected);
  if (indexRow !== -1 && indexCol !== -1 && indexAux !== -1) {
    // seat already selected, remove
    this.rowsSelected.splice(indexRow, 1);
    this.columnsSelected.splice(indexCol, 1);
    this.auxSelected.splice(indexAux, 1);
  } else {
    //push to selected array only if it is not reserved

    //if(!this.reservedChairs.find(reservedChair=>reservedChair.id.chairId === this.getChairId(rowSelected,columnSelected))){

    this.rowsSelected.push(rowSelected);
    this.columnsSelected.push(columnSelected);
    this.auxSelected.push(rowSelected + columnSelected);

    //}
  }
  this.price = this.movie.price * this.rowsSelected.length;
}

onReserve(spinner:string) {
  let reserve = {
    email: this.tokenService.getEmail(),
    idMovie: this.movie.id,
    idRoom: this.idRoom,
    schedule: this.schedule,
    chairsNumber: this.auxSelected.length,
    rows: this.rowsSelected,
    columns: this.columnsSelected,
  };


if(this.userId!=null){

  this.subs.push(
    this.apiService.updateReservation(reserve).subscribe(
      (data)=>{

        console.log(data);
      },(err)=>{

        this.router.navigateByUrl('/RefrshComponent',
        {skipLocationChange: true}).then(()=> this.router.navigate(["reservations"]));
        this.alertSuccess(err.error.text);
        this.closeModal();
      }
    )
  )
}else{
  this.subs.push(
    this.apiService.createReservation(reserve).subscribe(
      (data) => {

        console.log(data);
      }, (err)=>{
        this.closeModal();
        this.alertSuccess(err.error.text)
      }
    )
  );
}
}
alertSuccess(message:string){
  Swal.fire({
    title: 'Reserva Creada',
    text: message,
    icon: 'success',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: '#012a4a'
  })
}
}

