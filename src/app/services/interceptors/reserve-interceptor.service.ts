import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq=req;   //<==interceptedRequest
   const token = this.tokenService.getToken();

   if (token) {
    intReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${ token }`
      }
    });
  }
    return next.handle(intReq);
  }
}

export const interceptorProvider= [{provide: HTTP_INTERCEPTORS, useClass: ReserveInterceptorService, multi: true}]
