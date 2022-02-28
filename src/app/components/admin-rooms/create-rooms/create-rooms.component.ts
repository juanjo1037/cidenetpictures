import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/chair';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.scss']
})
export class CreateRoomsComponent implements OnInit {
  roomForm!: FormGroup;
  subs: Subscription[] = [];

  constructor(private fb:FormBuilder,
    private router:Router,
    private apiService:ApiService,
    private modal:NgbModal) { }

  ngOnInit(): void {
    this.createPresentationForm();
  }
  createPresentationForm() {
    this.roomForm = this.fb.group({
      rowsNumber: new FormControl(),
      columnsNumber: new FormControl(),

    });
  }
  closeModal(){
    this.modal.dismissAll();
  }
  onCreate(roomForm:Room){
    if (this.roomForm.valid) {
      console.log(roomForm);
      this.closeModal()
      this.apiService.createRoom(roomForm).subscribe(
        (data) => {

        },
        (err) => {
          console.log(err);

          if (err.status == 201) {

            this.alertSuccess(err.error.text);
            this.router.navigateByUrl('/RefrshComponent',
           {skipLocationChange: true}).then(()=> this.router.navigate(["rooms-admin"]));
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
