import {Manga} from "./manga";

export interface Editeur {
  id: number;
  nom: string;
  logo: string;
  mangas: Manga[];
}
