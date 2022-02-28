import {  } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TokenService } from 'src/app/services/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  id: number;
  movie: Movies;
  isAdmin = false;
  isLogged = false;
  email: string;
  sticky = false;
  isBillboard = false;
  isComingSoon = false;
  ShowFilter = false;
  limitSelection = false;
  genresList: Array<any> = [];

  selectedItems: Array<any> = [];
  isChecked: boolean = false;
  movieForm!: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  private durationPattern: any =
    /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])$/;
  private URLPatern =
    /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  private synopsisPattern: any = /^[\s\S]{20,500}$/;
  @ViewChild('stickHeader') header: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.isLogged();
    this.email = this.tokenService.getEmail();
    this.createMovieForm();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.movieService.getMovieById(this.id).subscribe(
        (res) => {
          this.movie = res;

          this.movieForm.setValue({
            title: this.movie.title,
            genre: this.movie.genre.split(', '),
            synopsis: this.movie.synopsis,
            image: this.movie.image,
            format: this.movie.format,
            duration: this.movie.duration,
            price: this.movie.price,
            backDropImg: this.movie.backDropImg,
            category: this.categorySet(),
          });
          // this.selectedgenresList();
        },
        (err) => {
          console.log(err);
        }
      );
    });

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
      enableCheckAll: false,
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: -1,
    };
  }
  selectedgenresList() {
    for (let genre of this.genresList) {
      if (this.movie.genre.includes(genre)) this.selectedItems.push(genre);
    }
    this.movieForm.patchValue({ genre: this.selectedItems });
  }
  categorySet(): string {
    if (this.movie.billboard) {
      return 'billboard';
    }
    if (this.movie.comingSoon) {
      return 'comingSoon';
    }
  }

  createMovieForm() {
    this.movieForm = this.fb.group({
      title: new FormControl('', Validators.required),
      genre: new FormControl(''),
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


    var index = this.selectedItems.indexOf(item);
    if (index > -1) this.selectedItems.splice(index, 1);

  }
  onItemSelect(item: any) {
    this.selectedItems.push(item);

  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  setCategory(movie: Movies) {
    if (this.movieForm.get('category').value == 'billboard') {
      movie.billboard = true;
      movie.comingSoon = false;
    } else if (this.movieForm.get('category').value == 'comingSoon') {
      movie.comingSoon = true;
      movie.billboard = false;
    }
  }
  onEdit(movie: Movies) {
    if (this.movieForm.valid) {
      this.setCategory(movie);
      movie.genre = (this.movieForm.get('genre').value as []).join(', ');

      this.movieService.updateMovie(movie, this.id).subscribe(
        (data) => {

        },
        (err) => {

          this.router.navigate(['/movies-admin']);
          if (err.status == 200) {
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
  alertSuccess(message: string) {
    Swal.fire({
      title: 'Pelicula Actualizada',
      text: message,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a',
    });
  }
  alertError(message: string) {
    Swal.fire({
      title: 'Error al actualizar pelicula',
      text: message,
      icon: 'error',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a',
    });
  }
  get title() {
    return this.movieForm.get('title');
  }
  get genre() {
    return this.movieForm.get('genre');
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
