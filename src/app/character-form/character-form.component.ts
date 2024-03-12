import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardAvatar, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CharacterFacadeService} from "../character-facade.service";
import {EditorDto} from "../dto/EditorDto";
import {HttpErrorResponse} from "@angular/common/http";
import {MangaDto} from "../dto/MangaDto";

@Component({
  selector: 'app-character-form',
  standalone: true,
    imports: [
        FlexModule,
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatError,
        MatFabButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatToolbar,
        ReactiveFormsModule
    ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent implements OnInit{
  isCreatePerso = this.route.snapshot.routeConfig?.path?.includes("nouveau-personnage");

  idEditorFromUrl = this.route.snapshot.params['idEditeur'];
  allEditors : EditorDto[] | undefined;

  idMangaFromUrl = this.route.snapshot.params['idManga'];
  allMangas : MangaDto[] | undefined;
  mangasToDisplay : MangaDto[] | undefined;

  idPersoFromUrl = this.route.snapshot.params['idPerso'];

  characterForm = new FormGroup({
    editor: new FormControl('', [Validators.required]),
    manga: new FormControl('', [Validators.required]),
    libelle: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    particularite: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private characterFacadeService: CharacterFacadeService) {}

  ngOnInit() {
    this.characterFacadeService.getEditor(this.idEditorFromUrl ?? '')
      ?.subscribe({
          error: (errorHttp: HttpErrorResponse) => {
            if (errorHttp.error.statusCode === 404) {
              this.characterFacadeService.navigate(['error-404']);
            }
            console.error(errorHttp);
          }
        }
      )

    this.characterFacadeService.getManga(this.idMangaFromUrl ?? '')
      ?.subscribe({
          error: (errorHttp: HttpErrorResponse) => {
            if (errorHttp.error.statusCode === 404) {
              this.characterFacadeService.navigate(['error-404']);
            }
            console.error(errorHttp);
          }
        }
      )

    if (!this.isCreatePerso){
      this.characterFacadeService.getCharacter(this.idPersoFromUrl ?? '')
        ?.subscribe({
            next: (characterDto) => {
              this.characterForm.controls.libelle.setValue(characterDto.libelle);
              this.characterForm.controls.role.setValue(characterDto.role);
              this.characterForm.controls.particularite.setValue(characterDto.particularite);
            }, error: () => {
              this.characterFacadeService.navigate(['error-404']);
            }
          }
        );
    }

    this.characterFacadeService.getAllEditors().subscribe({
      next: (data) => {
        this.allEditors = data;
        this.characterForm.controls.editor.setValue(this.idEditorFromUrl);
      }, error: () => {
        this.characterFacadeService.openDialog('Erreur lors de la récupération des éditeurs! Veuillez réessayer.');
      }
    });

    this.characterFacadeService.getAllMangas().subscribe({
      next: (data) => {
        this.allMangas = data;
        this.mangasToDisplay = this.characterFacadeService.filterMangasByEditor(this.allMangas, this.characterForm.value.editor!);
        this.characterForm.controls.manga.setValue(this.idMangaFromUrl);
      }, error: () => {
        this.characterFacadeService.openDialog('Erreur lors de la récupération des mangas! Veuillez réessayer.');
      }
    });
  }

  setMangaList() {
    this.mangasToDisplay = this.characterFacadeService.filterMangasByEditor(this.allMangas!, this.characterForm.value.editor!);
    this.characterForm.controls.manga.setValue(null)
  }

  getMangaErrorMessage() {
    if(this.mangasToDisplay) {
      return this.mangasToDisplay.length ?
        'Veuillez sélectionner un manga' : 'Veuillez d\'abord créer un manga pour cet éditeur';
    }
    return '';
  }
  onSubmit() {
    this.isCreatePerso ? this.onCreate() : this.onUpdate()
  }

  private onCreate() {
    this.characterFacadeService.createCharacter(
      this.characterForm.value.libelle!,
      this.characterForm.value.role!,
      this.characterForm.value.particularite!,
      this.mangasToDisplay?.find((element) => element._id === this.characterForm.value.manga!)!
    ).subscribe({
      next: () => {
        this.characterFacadeService.navigate(
          [ `editeur/${this.characterForm.value.editor}/manga/${this.characterForm.value.manga}`]
        );
      }, error: () => {
        this.characterFacadeService.openDialog('Erreur lors de la création du personnage!\nVeuillez réessayer.');
      }
    });
  }

  private onUpdate() {
    this.characterFacadeService.updateCharacter(
      this.idPersoFromUrl,
      this.characterForm.value.libelle!,
      this.characterForm.value.role!,
      this.characterForm.value.particularite!,
      this.mangasToDisplay?.find((element) => element._id === this.characterForm.value.manga!)!
    ).subscribe({
      next: () => {
        this.characterFacadeService.navigate(
          [ `editeur/${this.characterForm.value.editor}/manga/${this.characterForm.value.manga}`]
        );
      }, error: () => {
        this.characterFacadeService.openDialog('Erreur lors de la modification du personnage !\nVeuillez réessayer.');
      }
    });
  }

  goBack() {
    this.characterFacadeService.navigate([`editeur/${this.idEditorFromUrl}/manga/${this.idMangaFromUrl}`]);
  }
}
