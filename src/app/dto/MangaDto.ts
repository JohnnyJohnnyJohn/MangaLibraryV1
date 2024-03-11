import {EditorDto} from "./EditorDto";

export interface MangaDto {
  _id: string;
  libelle: string;
  urlImg: string;
  editor: EditorDto;
}
