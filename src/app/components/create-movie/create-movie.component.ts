import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TokenService } from 'src/app/services/token/token.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Movies } from 'src/app/models/movies';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  isAdmin = false;
  isLogged = false;
  email: string;
  sticky = false;
  isBillboard=false;
  isComingSoon=false;
  ShowFilter = false;
  limitSelection = false;
  genresList: Array<any> = [];

  genresSelected: string[] = [];
  isChecked: boolean = false;
  movieForm!: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  private durationPattern: any =
    /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])$/;
  private URLPatern =
    /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  private synopsisPattern: any = /^[\s\S]{20,500}$/;
  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private movieService:MoviesService
  ) {}
  @ViewChild('stickHeader') header: ElementRef;

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.isLogged();
    this.email = this.tokenService.getEmail();
    this.genresList = [
      'Acción',
      'Aventuras',
      'Ciencia Ficción',
      'Crimen',
      'Comedia',
      'Documental',
      'Drama',
      'Fantasía',
      'Misterio',
      'Musical',
      'Suspenso',
      'Terror',
    ];
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'item_id',
      enableCheckAll:false,
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: -1,
    };
    this.createMovieForm();

  }

  createMovieForm() {
    this.movieForm = this.fb.group({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      synopsis: new FormControl('', [
        Validators.required,
        Validators.pattern(this.synopsisPattern),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(this.URLPatern),
      ]),
      format: new FormControl('', [Validators.required]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern(this.durationPattern),
      ]),
      price: new FormControl('', Validators.required),
      backDropImg: new FormControl('', [
        Validators.required,
        Validators.pattern(this.URLPatern),
      ]),
      category: new FormControl(),


    });
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
  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);

    var index = this.genresSelected.indexOf(item);
    if (index > -1) this.genresSelected.splice(index, 1);
    console.log(this.genresSelected);
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.genresSelected.push(item);
    console.log(this.genresSelected);
  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter,
    });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2,
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: null,
      });
    }
  }

  setCategory(movieForm:Movies){
    if(this.movieForm.get('category').value=="billboard"){
        movieForm.billboard=true;
        movieForm.comingSoon=false;
    }else if (this.movieForm.get('category').value=="comingSoon"){
      movieForm.comingSoon=true;
      movieForm.billboard=false
    }
  }
  onCreate(movieForm: Movies) {
    if (this.movieForm.valid) {
      movieForm.genre = (this.movieForm.get('genre').value as []).join(', ');
      this.setCategory(movieForm);

      this.movieService.createMovie(movieForm).subscribe(
        (data) => {


        },
        (err) => {

          this.router.navigate(['/admin-movies']);
          if (err.status == 201) {
            this.alertSuccess(err.error.text);
          } else {
            this.alertError(err.error.text);
          }
        }
      );
    } else {
      console.log('Error en el formulario');
    }
  }
  alertSuccess(message:string) {
    Swal.fire({
      title: 'Pelicula creada creada',
      text: message,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a'
    });
  }
  alertError(message: string) {
    Swal.fire({
      title: 'Error al crear pelicula',
      text: message,
      icon: 'error',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a'
    });
  }
  get title() {
    return this.movieForm.get('title');
  }

  get synopsis() {
    return this.movieForm.get('synopsis');
  }
  get image() {
    return this.movieForm.get('image');
  }
  get format() {
    return this.movieForm.get('format');
  }
  get duration() {
    return this.movieForm.get('duration');
  }
  get price() {
    return this.movieForm.get('price');
  }
  get backDropImg() {
    return this.movieForm.get('backDropImg');
  }
}
