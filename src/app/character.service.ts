import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MangaDto} from "./dto/MangaDto";
import {CharacterDto} from "./dto/CharacterDto";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl: string = 'http://localhost:4000/api/v1/characters';

  constructor(private http: HttpClient) {}

  getAllCharacters() {
    return this.http.get<CharacterDto[]>(this.apiUrl);
  }

  getCharacter(id: string) {
    return this.http.get<CharacterDto>(`${this.apiUrl}/${id}`);
  }

  createCharacter(libelle: string, role: string, particularite: string, manga: MangaDto){
    return this.http.post<CharacterDto>(this.apiUrl, { libelle, role, particularite, manga });
  }

  updateCharacter(id: string, libelle: string, role: string, particularite: string, manga: MangaDto){
    return this.http.put<CharacterDto>(`${this.apiUrl}/${id}`, { libelle, role, particularite, manga });
  }

  deleteCharacter(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
