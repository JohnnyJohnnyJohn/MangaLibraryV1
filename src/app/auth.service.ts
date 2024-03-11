import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationResponseDto} from "./dto/AuthenticationResponseDto";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de l'API
  private apiUrl: string = 'http://localhost:4000/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ) {
    // Effectuer la requête POST pour la connexion
    return this.http.post<AuthenticationResponseDto>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  // Méthode pour enregistrer un nouvel utilisateur
  register(firstName: string, lastName: string, email: string, password: string): Observable<AuthenticationResponseDto> {
    // Effectuer la requête POST pour l'enregistrement
    return this.http.post<AuthenticationResponseDto>(
      `${this.apiUrl}/register`,
      { firstName, lastName, email, password }
    );
  }
}
