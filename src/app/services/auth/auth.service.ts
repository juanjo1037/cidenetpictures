import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JwtDto } from 'src/app/models/jwt-dto';
import { LoginI } from 'src/app/models/login.interface';

import { SignUpI } from 'src/app/models/signup.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl= environment.authUrl;


  constructor(private http:HttpClient ) { }

  public newUSer(signUp: SignUpI): Observable<any>{
    return this.http.post<any>(this.authUrl+'registration',signUp);
  }
  public loginUser(loginI: LoginI): Observable<JwtDto>{
    return this.http.post<JwtDto>(this.authUrl+'login',loginI);
  }
}
