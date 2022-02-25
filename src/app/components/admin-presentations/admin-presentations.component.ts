import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Presentation } from 'src/app/models/presentation.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-presentations',
  templateUrl: './admin-presentations.component.html',
  styleUrls: ['./admin-presentations.component.scss']
})
export class AdminPresentationsComponent implements OnInit {
  isAdmin=false;
  isLogged=false;
  email:string;
  sticky = false;
  presentations:Presentation[]=[];
  subs: Subscription[] = [];
  @ViewChild('stickHeader') header: ElementRef;
  constructor(private api:ApiService,private tokenService:TokenService,
    private modal:NgbModal)
   { }

  ngOnInit(): void {
    this.email=this.tokenService.getEmail();
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.subs.push(this.api.getPresentations().subscribe(data =>{
      this.presentations = data;

    }));
  }
open(content){
  this.modal.open(content);
}
}
