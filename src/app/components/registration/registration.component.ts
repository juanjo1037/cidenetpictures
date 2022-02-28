import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignUpI } from 'src/app/models/signup.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formSignup!: FormGroup;
  signUpI!: SignUpI;
  errorMessage!: string;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern: any =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
  private documentPattern: any = /^([0-9]){6,12}$/;
  private namePattern: any = /^[a-zA-Z ]*$/;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    public modal:NgbModal
  ) {

  }
  ngOnInit(): void {
    this.createSignupForm();
  }
  closeModal(){
    this.modal.dismissAll();
  }
  createSignupForm() {
    this.formSignup= this.fb.group({
      documentType: new FormControl('', Validators.required),
      document: new FormControl('',[ Validators.required,Validators.pattern(this.documentPattern)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: this.MustMatch('password', 'confirmPassword' )})
  }

  MustMatch(controlName:string, matchingControlName:string ){
    return (formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName]
      const matching = formGroup.controls[matchingControlName]
      if(matching.errors && !matching.errors.MustMatch){
        return;
      }
      if (control.value !== matching.value){
        matching.setErrors({MustMatch: true})
      }
      else {
        matching.setErrors(null);
      }
    }

  }
  onRegister(formSignup: SignUpI) {
    if (this.formSignup.valid) {
      this.closeModal();
      this.authService.newUSer(formSignup).subscribe(
        (data) => {
          this.router.navigate(['/login']);

        },(err)=>{
          console.log(err);
          if (err.status==201){
            this.alertSuccess();
            this.closeModal();
          }else
          {
            this.alertError(err.error);
          }
        }

      );
    } else {
      console.log('Error en el formulario');
    }
  }

alertSuccess(){
  Swal.fire({
    title: 'Cuenta creada',
    text: 'La cuenta ha sido creada con éxito',
    icon: 'success',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: '#012a4a'
  })
}
alertError(message:string){
  Swal.fire({
    title: 'Error al crear cuenta',
    text: message,
    icon: 'error',
    confirmButtonText: 'Confimar',
    confirmButtonColor: '#012a4a'
  })
}
  get documentType() {
    return this.formSignup.get('documentType');
  }
  get document() {
    return this.formSignup.get('document');
  }
  get firstName() {
    return this.formSignup.get('firstName');
  }
  get lastName() {
    return this.formSignup.get('lastName');
  }
  get email() {
    return this.formSignup.get('email');
  }
  get password() {
    return this.formSignup.get('password');
  }
  get confirmPassword() {
    return this.formSignup.get('confirmPassword');
  }
}
