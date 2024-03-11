import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenService.getToken();
    if(token) {
      const cloneRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloneRequest);
    } else {
      const cloneRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      return next.handle(cloneRequest);
    }
  }
}
