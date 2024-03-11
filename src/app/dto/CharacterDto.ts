import {MangaDto} from "./MangaDto";

export interface CharacterDto {
  _id: string;
  libelle: string;
  role: string;
  particularite: string;
  manga: MangaDto;
}
