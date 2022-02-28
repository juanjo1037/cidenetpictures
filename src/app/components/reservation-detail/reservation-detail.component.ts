import { Component, Input, OnInit } from '@angular/core';
import { Id, Reservation } from 'src/app/models/reservation.interface';
import { ApiService } from 'src/app/services/api/api.service';
import {ReservedChair} from 'src/app/models/reservedChair.interface';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/services/token/token.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  @Input() reservation:Reservation;
   headerBGUrl:string;
   reservedChairs:ReservedChair[]=[];
   subs: Subscription[]=[];

  constructor(private apiService:ApiService, private router:Router, private modal:NgbModal,
    private tokenService:TokenService
    ) { }

  ngOnInit(): void {


    this.headerBGUrl=this.reservation.presentation.movie.backDropImg;
    this.apiService.getReservedChairByPresentationAndUser(this.reservation.id.presentationRoomId,this.reservation.id.presentationSchedule,this.reservation.id.userId).subscribe(
      data=> {
        this.reservedChairs=data;
        console.log(data);
      });
  }
  selectedMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
  closeModal(){
    this.modal.dismissAll();
  }
  open(content){
    this.modal.open(content);
  }
  deleteReservation(){
    let reserve={

    email: this.tokenService.getEmail(),
    idRoom: this.reservation.presentation.id.roomId,
    schedule: this.reservation.presentation.id.schedule
    }
    this.modal.dismissAll();
    this.subs.push(
      this.apiService.deleteReservation(reserve).subscribe(
        (data)=>{
          console.log(data);
        },(err)=>{
          this.router.navigateByUrl('/RefrshComponent',
          {skipLocationChange: true}).then(()=> this.router.navigate(["reservations"]));

          this.alertSuccess(err.error.text)

        }
      )
    )
  }
  alertSuccess(message:string){
    Swal.fire({
      title: 'Reserva Eliminada',
      text: message,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a'
    })
  }
}
