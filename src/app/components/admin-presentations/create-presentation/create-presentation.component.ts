import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/chair';
import { Movies } from 'src/app/models/movies';
import { Id, Presentation } from 'src/app/models/presentation.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.scss'],
})
export class CreatePresentationComponent implements OnInit {
  presentationForm!: FormGroup;
  @Input() presentation: Presentation;
  movies: Movies[] = [];
  rooms: Room[] = [];
  subs: Subscription[] = [];
  error!: any;
  constructor(
    private moviesService: MoviesService,
    private fb: FormBuilder,
    private router: Router,
    private modal:NgbModal
  ) {}

  ngOnInit(): void {
    console.log(this.presentation)
    this.subs.push(
      this.moviesService.getAllRooms().subscribe((data) => {
        this.rooms = data;
        this.subs.push(
          this.moviesService.getMoviesOnBillboard().subscribe((data) => {
            this.movies = data;
            if(this.presentation!=null){
              this.presentationForm.setValue({
                idRoom: this.presentation.id.roomId,
                schedule: this.presentation.id.schedule,
                idMovie: this.presentation.movie.id,
                available: this.presentation.available,

              });
            }
          })
        );
      })
    );
    this.createPresentationForm();
  }
closeModal(){
  this.modal.dismissAll();
}
  createPresentationForm() {
    this.presentationForm = this.fb.group({
      idRoom: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      idMovie: new FormControl('', Validators.required),
      available: new FormControl('true', Validators.required),
    });
  }
  onCreate(presentation) {
    if (this.presentationForm.valid) {
      console.log(presentation);
     if(this.presentation==null){
      this.moviesService.createPresentation(presentation).subscribe(
        (data) => {

        },
        (err) => {
          console.log(err);

          if (err.status == 201) {
            this.closeModal()
            this.alertSuccess(err.error.text);
            this.router.navigateByUrl('/RefrshComponent',
           {skipLocationChange: true}).then(()=> this.router.navigate(["presentations-admin"]));
          } else {
            this.alertError(err.error.text);
          }
        }
      );
     }else{
      this.moviesService.updatePresentation(presentation).subscribe(
        (data) => {

          console.log(data);

          if (data.statusCodeValue == 200) {
            this.closeModal()
            this.alertSuccess(data.body);
            this.router.navigateByUrl('/RefrshComponent',
           {skipLocationChange: true}).then(()=> this.router.navigate(["presentations-admin"]));
          } else {
            this.alertError(data.body);
          }
        },

      );
     }

    } else {
      console.log('Error en el formulario');
    }
  }
  alertSuccess(message: string) {
    Swal.fire({
      title: 'Solicitud realizada con éxito',
      text: message,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a',
    });
  }
  alertError(message: string) {
    Swal.fire({
      title: 'Error al procesar la solicitud',
      text: message,
      icon: 'error',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012a4a',
    });
  }
}
