import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {EditorService} from "./editor.service";
import {MangaService} from "./manga.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {EditorDto} from "./dto/EditorDto";
import {MangaDto} from "./dto/MangaDto";
import {CharacterDto} from "./dto/CharacterDto";
import {CharacterService} from "./character.service";

@Injectable({
  providedIn: 'root'
})
export class MangaFacadeService {

  constructor(
    private router: Router,
    private editorService: EditorService,
    private mangaService: MangaService,
    private characterService: CharacterService,
    private dialog: MatDialog
  ) { }

  getManga(id: string | undefined) {
    if(id !== undefined) {
      return this.mangaService.getManga(id);
    } else {
      this.navigate(['error-404']);
      return null
    }
  }

  createManga(libelle: string, editor: EditorDto, urlImg: string) {
    return this.mangaService.createManga(libelle, editor, urlImg)
  }

  updateManga(id: string, libelle: string, editor: EditorDto, urlImg: string) {
    return this.mangaService.updateManga(id, libelle, editor, urlImg)
  }

  getAllEditors() {
    return this.editorService.getAllEditors()
  }

  getEditor(id: string | undefined) {
    if(id !== undefined) {
      return this.editorService.getEditor(id)
    } else {
      this.navigate(['error-404']);
      return null
    }
  }

  getAllCharacters(){
    return this.characterService.getAllCharacters()
  }

  deleteCharacter(id: string){
    return this.characterService.deleteCharacter(id)
  }

  filterCharactersByManga(allCharacters: CharacterDto[], idManga: string){
    return allCharacters.filter((character: CharacterDto) =>  character.manga._id === idManga);
  }

  navigate(route: string[]) {
    this.router.navigate(route);
  }

  openDialog(message: string) {
    this.dialog.open(AlertDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }


}
