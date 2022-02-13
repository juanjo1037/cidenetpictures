import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean=false;
  isLogged=false;
  email:string;
  sticky = false;

  subs: Subscription[] = [];
  billboard: Movies[] = [];
  comingSoon: Movies[] = [];
  topRated: Movies[] = [];


  sliderConfig = {
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;

  constructor(private movie: MoviesService,
    private tokenService:TokenService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.email=this.tokenService.getEmail();
    this.subs.push(this.movie.getMoviesOnBillboard().subscribe(data => {
      this.billboard = data;
      this.headerBGUrl = this.billboard[0].backDropImg;
    }));
    this.subs.push(this.movie.getMoviesByGenre("accion").subscribe(data => this.comingSoon = data));
    this.subs.push(this.movie.getMoviesByGenre("comedia").subscribe(data => this.topRated = data));


  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
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
  selectedMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
