import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movies } from 'src/app/models/movies';
import { Presentation } from 'src/app/models/presentation.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class MovieDetailComponent implements OnInit {
  id: any;
  movie:Movies;
  presentations:Presentation[]=[]
  isAdmin: boolean=false;
  email:string;
  sticky = false;
  isLogged=false;
  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;
  posterBGUrl: string;
  schedule:String;
  roomId:number;


  constructor(private moviesService:MoviesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private tokenService:TokenService,
    private apiService:ApiService,
    config: NgbModalConfig,
    public modalService: NgbModal)
     {
      config.backdrop = 'static';
      config.keyboard = false;
      }

      open(content: any) {
        this.modalService.open(content);
      }

  ngOnInit(): void {
    this.isAdmin= this.tokenService.isAdmin();
    this.isLogged=this.tokenService.isLogged();
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.moviesService.getMovieById(this.id)
        .subscribe(
          res => {

            this.movie = res;
            this.headerBGUrl=res.backDropImg;
            this.posterBGUrl=res.image;

            this.apiService.getPresentationByMovie(this.movie.id).subscribe(
              data=> {
                this.presentations=data;

              });
          },
          err => console.log(err)
        )
    });

  }
  onSelect(schedule:String, roomId:number){
    this.schedule=schedule;
    this.roomId=roomId;

  }
  presentationsIsEmpty():boolean{
    if (this.presentations.length>0){
      return true
    }else
    return false
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
