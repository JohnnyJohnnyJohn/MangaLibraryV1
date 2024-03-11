import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexModule } from "@angular/flex-layout";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { UpperCasePipe } from "@angular/common";
import { MatTooltip } from "@angular/material/tooltip";
import { AuthFacadeService } from "../auth-facade.service";
import { AuthenticationResponseDto } from "../dto/AuthenticationResponseDto";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    FlexModule,
    MatButtonModule,
    MatToolbar,
    UpperCasePipe,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  hidePassword = true;
  isEmailHintVisible = false;
  isPasswordHintVisible = false;

  constructor(private authFacadeService: AuthFacadeService){}

  getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'Veuillez entrer votre email';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Veuillez entrer un email valide' : '';
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.authFacadeService.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!,
      ).subscribe({
        next: (response: AuthenticationResponseDto) => {
          this.authFacadeService.setTokenAndGoHome(response.accessToken);
        }, error: (errorHttp: any) => {
          if (errorHttp.error.message === "EMAIL_NOT_FOUND") {
            this.isEmailHintVisible = true;
          } else if (errorHttp.error.message === "PASSWORD_DONT_MATCH" || "USER_IS_DELETED") {
            this.isPasswordHintVisible = true;
          } else {
            this.authFacadeService.openDialog('Il y a eu une erreur lors de la connexion! Veuillez réessayer.');
          }
        }
      });
    }
  }
}
