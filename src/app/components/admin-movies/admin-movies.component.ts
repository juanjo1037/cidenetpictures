import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';
import Swal from 'sweetalert2';

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
    private movieService:MoviesService,
    private modal:NgbModal,
    private router:Router) { }

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
  selectedMovie(id: number) {
    this.router.navigate(['/edit-movie', id]);
  }
  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();

  }
  open(content)
  {
    this.modal.open(content);
  }
  onDelete(id:number){
    this.subs.push(this.movieService.deleteMovie(id).subscribe(data =>{
      this.movies = data

    },(err)=>{
      if(err.error.text=="pelicula eliminada")
     {
       this.alertSuccess(err.error.text);
       this.router.navigateByUrl('/RefrshComponent',
       {skipLocationChange: true}).then(()=> this.router.navigate(["movies-admin"]));
     }
     else
       this.alertError(err.error.text);
    })
    );
  }
  alertSuccess(message:string){
    Swal.fire({
      title: 'Pelicula Eliminada',
      text: message,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a'
    })
  }
  alertError(message:string){
    Swal.fire({
      title: 'Error al eliminar pelicula',
      text: message,
      icon: 'error',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a'
    })
  }

}
