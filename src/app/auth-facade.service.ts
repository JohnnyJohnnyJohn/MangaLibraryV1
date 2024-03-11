import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string){
    return this.authService.login(email, password)
  }

  register(nom: string, prenom: string, email: string, password: string) {
    return this.authService.register(nom, prenom, email, password)
  }

  setToken(accessToken: string) {
    this.tokenService.setToken(accessToken)
  }

  navigate(route: string[]) {
    this.router.navigate(route);
  }

  openDialog(message: string) {
    this.dialog.open(AlertDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }

  setTokenAndGoHome(accessToken: string) {
    this.setToken(accessToken);
    this.navigate(['/'])
  }
}
