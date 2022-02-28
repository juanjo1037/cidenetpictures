import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpinnerService } from "../spinner/spinner.service";
import{finalize} from "rxjs/operators"
import { Injectable } from "@angular/core";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
  constructor(private spinner:SpinnerService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => this.spinner.hide()));
  }
}
export const spinnerInterceptorProvider= [{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}]
