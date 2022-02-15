import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {
  genres = [
    { id: 1, genre: "Acción" },
    { id: 2, genre: "Aventuras" },
    { id: 3, genre: "Ciencia Ficción" },
    { id: 4, genre: "Comedia" },
    { id: 5, genre: "documental" },
    {id:6, genre:"Drama"},
    {id:7, genre:"Fantasía"},
    {id:8, genre:"Musical"},
    {id:8, genre:"Suspenso"},
    {id:8, genre:"Terror"},
  ];
  selected = [];
  formMovie!: FormGroup;
  private durationPattern: any = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  private URLPatern=/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createMovieForm();
  }

  createMovieForm() {
    this.formMovie= this.fb.group({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      synopsis: new FormControl('', [Validators.required, Validators.minLength(150),Validators.maxLength(200)]),
      image: new FormControl('', [Validators.required, Validators.pattern(this.URLPatern)]),
      format: new FormControl('', [
        Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.pattern(this.durationPattern)]),
      price: new FormControl('', Validators.required),
      backDropImg: new FormControl('', [Validators.required, Validators.pattern(this.URLPatern)])
    })
  }
  get title() {
    return this.formMovie.get('title');
  }
  get genre() {
    return this.formMovie.get('genre');
  }
  get synopsis() {
    return this.formMovie.get('synopsis');
  }
  get image() {
    return this.formMovie.get('image');
  }
  get format() {
    return this.formMovie.get('format');
  }
  get duration() {
    return this.formMovie.get('duration');
  }
  get price() {
    return this.formMovie.get('price');
  }
  get backDropImg() {
    return this.formMovie.get('backDropImg');
  }
}
