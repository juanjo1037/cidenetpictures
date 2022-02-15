import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReserveComponent implements OnInit {
  subs:Subscription[]=[];
  email:string;
  sticky = false;
  isAdmin: boolean=false;
  isLogged=false;
  reservations: Reservation[]=[];
  constructor(private apiService:ApiService, private tokenService:TokenService, private modal:NgbModal) { }
  @ViewChild('stickHeader') header: ElementRef;
  ngOnInit(): void {
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.email=this.tokenService.getEmail();
    this.subs.push(this.apiService.getReservations(this.email).subscribe(data=>{
      this.reservations=data;
      console.log(this.reservations);
    }))
  }
  reservationIsEmpty():boolean{
    if(this.reservations.length<1){
      return true;
    }else return false;

  }
    open(content:any){
      this.modal.open(content,{size:'lg',
      windowClass:'window',
      backdropClass:'modalBackDropColor'})
    }
    @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();

  }
}
