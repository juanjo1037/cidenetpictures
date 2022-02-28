import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/chair';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.scss']
})
export class AdminRoomsComponent implements OnInit {
  isAdmin=false;
  isLogged=false;
  email:string;
  rooms:Room[]=[]
  subs:Subscription[]=[];
  constructor(private tokenService:TokenService,
    private apiService:ApiService,
    private modal:NgbModal) { }

  ngOnInit(): void {
    this.email=this.tokenService.getEmail();
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.subs.push(this.apiService.getRooms().subscribe(data =>{
      this.rooms = data

    }));
  }
  open(content){
  this.modal.open(content);
  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
