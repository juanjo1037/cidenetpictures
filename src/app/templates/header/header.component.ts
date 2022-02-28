import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean=false;
  isLogged=false;
  email:string;
  sticky = false;
  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    this.isAdmin=this.tokenService.isAdmin();

    this.isLogged=this.tokenService.isLogged();
    this.email=this.tokenService.getEmail();
  }
  @ViewChild('stickHeader') header: ElementRef;

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
