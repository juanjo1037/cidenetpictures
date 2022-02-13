import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {
isAdmin=false;
isLogged=false;
email:string;
sticky = false;
movies:Movies[]=[];
subs: Subscription[] = [];
@ViewChild('stickHeader') header: ElementRef;
  constructor(private tokenService:TokenService,
    private movieService:MoviesService) { }

  ngOnInit(): void {
    this.email=this.tokenService.getEmail();
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.subs.push(this.movieService.getAllMovies().subscribe(data =>{
      this.movies = data

    }));

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
