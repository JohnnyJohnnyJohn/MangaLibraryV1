import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EditorService} from "./editor.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MangaService} from "./manga.service";
import {MangaDto} from "./dto/MangaDto";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class EditorFacadeService {

  constructor(
    private router: Router,
    private editorService: EditorService,
    private mangaService: MangaService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) { }

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

  createEditor(libelle: string) {
    return this.editorService.createEditor(libelle)
  }

  updateEditor(idEditeur: string, libelle: string) {
    return this.editorService.updateEditor(idEditeur, libelle)
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

  logout() {
    this.tokenService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
