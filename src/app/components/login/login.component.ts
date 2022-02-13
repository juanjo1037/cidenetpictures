import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LoginI } from 'src/app/models/login.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import {NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  ],providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit {
  loginUser!: LoginI;

  errorMessage!: string;
  isAdmin: boolean=false;
  formLogin!: FormGroup;
  constructor( private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private fb: FormBuilder,
    public modal:NgbModal) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  open(content:any){
    this.modal.open(content);
  }
  createLoginForm() {
    this.formLogin= this.fb.group({

      email: new FormControl('',
        Validators.required,
      ),
      password: new FormControl('',
        Validators.required),

    })
  }
errToast(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'error',
    title: 'Error al iniciar sesión'
  })
}
successToast(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Sesión iniciada correctamente'
  })
}
  onLogin(formLogin: LoginI) {

    this.authService.loginUser(formLogin).subscribe(data=>{


        this.tokenService.setToken(data.token);

        this.router.navigate(['']);
        this.successToast();
      },(err)=>{
        if(err.status!=200){

          this.errToast();
        }else
        {


        }
      }
    );
}




get email() {
  return this.formLogin.get('email');
}
get password() {
  return this.formLogin.get('password');

}
}

