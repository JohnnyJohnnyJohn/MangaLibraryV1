import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {EditorService} from "./editor.service";
import {MangaService} from "./manga.service";
import {CharacterService} from "./character.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MangaDto} from "./dto/MangaDto";

@Injectable({
  providedIn: 'root'
})
export class CharacterFacadeService {

  constructor(
    private router: Router,
    private editorService: EditorService,
    private mangaService: MangaService,
    private characterService: CharacterService,
    private dialog: MatDialog
  ) { }

  getCharacter(id: string | undefined) {
    if(id !== undefined) {
      return this.characterService.getCharacter(id);
    } else {
      this.navigate(['error-404']);
      return null
    }
  }

  createCharacter(libelle: string, role: string, particularite: string, manga: MangaDto) {
    return this.characterService.createCharacter(libelle, role, particularite, manga)
  }

  updateCharacter(id: string, libelle: string, role: string, particularite: string, manga: MangaDto) {
    return this.characterService.updateCharacter(id, libelle, role, particularite, manga)
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

  getManga(id: string | undefined) {
    if(id !== undefined) {
      return this.mangaService.getManga(id);
    } else {
      this.navigate(['error-404']);
      return null
    }
  }

  getAllMangas(){
    return this.mangaService.getAllMangas()
  }

  filterMangasByEditor(allMangas: MangaDto[], idEditor: string){
    return allMangas.filter((manga: MangaDto) =>  manga.editor._id === idEditor);
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
