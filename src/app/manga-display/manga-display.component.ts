import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {FlexModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {UpperCasePipe} from "@angular/common";
import {MangaFacadeService} from "../manga-facade.service";
import {MangaDto} from "../dto/MangaDto";
import {HttpErrorResponse} from "@angular/common/http";
import {CharacterDto} from "../dto/CharacterDto";

@Component({
  selector: 'app-manga-display',
  standalone: true,
  imports: [MatTableModule, FlexModule, MatCardModule, MatFabButton, MatIcon, MatListModule, MatToolbar, RouterLink, UpperCasePipe, MatMiniFabButton],
  templateUrl: './manga-display.component.html',
  styleUrl: './manga-display.component.css'
})
export class MangaDisplayComponent implements OnInit{
  displayedColumns: string[] = ['nom', 'role', 'particularite', 'edition', 'suppression'];
  manga: MangaDto | undefined;
  characters: CharacterDto[] = []
  idEditor = this.route.snapshot.paramMap.get('idEditeur');

  constructor(private route: ActivatedRoute, private mangaFacadeService: MangaFacadeService) { }

  ngOnInit() {
    this.mangaFacadeService.getManga(this.route.snapshot.params['idManga'])
      ?.subscribe(
        {
          next: (manga: MangaDto) => {
            this.manga = manga;
            this.getCharactersFromManga(manga._id);
          }, error: (errorHttp: HttpErrorResponse) => {
            this.mangaFacadeService.navigate(['error-404']);
            console.error(errorHttp);
          }
        }
      ) || this.mangaFacadeService.navigate(['error-404']);
  }

  private getCharactersFromManga(idManga: string) {
    this.mangaFacadeService.getAllCharacters()
      ?.subscribe({
          next: (characters: CharacterDto[]) => {
            this.characters = this.mangaFacadeService.filterCharactersByManga(characters, idManga);
          }, error: (errorHttp: HttpErrorResponse) => {
            this.mangaFacadeService.navigate(['error-404']);
            console.error(errorHttp);
          }
        }
      )
  }

  onDelete(idCharacter: string){
    this.mangaFacadeService.deleteCharacter(idCharacter)?.subscribe({
      next: () => {
        this.characters = this.characters.filter(character => character._id != idCharacter);
      }, error: (errorHttp: HttpErrorResponse) => {
          this.mangaFacadeService.openDialog('Il y a eu une erreur lors de la suppression du personnage!\nVeuillez réessayer.');
          console.error(errorHttp);
        }
      }
    )
  }
}
