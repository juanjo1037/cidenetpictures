import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  isAdmin: boolean=false;
  email:string;
  sticky = false;
  isLogged=false;
  subs: Subscription[] = [];
  movies: Movies[]=[];
  constructor(private movieService:MoviesService,
    private router:Router,
    private tokenService  :TokenService) { }

  @ViewChild('stickHeader') header: ElementRef;
  ngOnInit(): void {
    this.isAdmin=this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.email=this.tokenService.getEmail();
    this.subs.push(this.movieService.getAllMovies().subscribe(data =>{
      this.movies = data

    }));
  }
  filterMoviesByGenre(genre:string):Movies[]{

  let moviesByGenre = this.movies.filter(item=>item.genre==genre);
  return moviesByGenre;
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
  selectedMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();

  }
}
