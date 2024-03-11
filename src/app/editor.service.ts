import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EditorDto} from "./dto/EditorDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private apiUrl: string = 'http://localhost:4000/api/v1/editors';

  constructor(private http: HttpClient) { }

  getAllEditors(): Observable<EditorDto[]> {

    return this.http.get<EditorDto[]>(this.apiUrl);
  }

  getEditor(id: string): Observable<EditorDto> {
    return this.http.get<EditorDto>(`${this.apiUrl}/${id}`);
  }

  createEditor(libelle: string){
    return this.http.post(this.apiUrl, { libelle });
  }

  updateEditor(id: string, libelle: string){
    return this.http.put(`${this.apiUrl}/${id}`, { libelle });
  }
}
