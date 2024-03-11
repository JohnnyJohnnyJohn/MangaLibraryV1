import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MangaDto} from "./dto/MangaDto";
import {EditorDto} from "./dto/EditorDto";

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private apiUrl: string = 'http://localhost:4000/api/v1/mangas';

  constructor(private http: HttpClient) { }

  getAllMangas(): Observable<MangaDto[]> {
    return this.http.get<MangaDto[]>(this.apiUrl);
  }

  getManga(id: string): Observable<MangaDto> {
    return this.http.get<MangaDto>(`${this.apiUrl}/${id}`);
  }

  createManga(libelle: string, editor: EditorDto, urlImg: string){
    return this.http.post<MangaDto>(this.apiUrl, { libelle, editor, urlImg });
  }

  updateManga(id: string, libelle: string, editor: EditorDto, urlImg: string){
    return this.http.put<MangaDto>(`${this.apiUrl}/${id}`, { libelle, editor, urlImg });
  }

}
