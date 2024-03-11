import {Personnage} from "./personnage";

export interface Manga {
  id: number;
  titre: string;
  logo: string;
  personnages: Personnage[];
}
