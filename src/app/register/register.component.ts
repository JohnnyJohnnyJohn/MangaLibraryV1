import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {confirmPasswordValidator} from "../confirm-password.validator";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {MatTooltip} from "@angular/material/tooltip";
import {AuthFacadeService} from "../auth-facade.service";
import {AuthenticationResponseDto} from "../dto/AuthenticationResponseDto";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FlexModule,
    MatCard,
    MatToolbar,
    MatButton,
    MatCardActions,
    MatCardContent,
    MatFormFieldModule,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    MatFabButton,
    HttpClientModule,
    MatTooltip
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator])
  })

  hidePassword = true;
  isEmailHintVisible = false;

  constructor(private authFacadeService: AuthFacadeService) {}

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Veuillez entrer votre email';
    }

    return this.registerForm.controls.email
      .hasError('email') ? 'Veuillez entrer un email valide' : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Veuillez entrer un mot de passe';
    }

    return this.registerForm.controls.password
      .hasError('minlength') ? '6 caractères minimum' : '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.registerForm.controls.confirmPassword.hasError('required')) {
      return 'Veuillez confirmer votre mot de passe';
    }

    return this.registerForm.controls.confirmPassword
      .hasError('PasswordNoMatch') ? 'Les mots de passes ne sont pas identiques' : '';
  }

  onSubmit() {
    if(this.registerForm.valid){
      this.authFacadeService.register(
        this.registerForm.value.prenom!,
        this.registerForm.value.nom!,
        this.registerForm.value.email!,
        this.registerForm.value.password!
      ).subscribe({
        next: (response: AuthenticationResponseDto) => {
          this.authFacadeService.setTokenAndGoHome(response.accessToken);
        }, error: (errorHttp: HttpErrorResponse) => {
          if(errorHttp.error.message === "USER_ALREADY_EXIST"){
            this.isEmailHintVisible = true
          } else {
            this.authFacadeService.openDialog('Il y a eu une erreur lors de l\'inscription!\nVeuillez réessayer.')
          }
        }
      });
    }
  }


}
