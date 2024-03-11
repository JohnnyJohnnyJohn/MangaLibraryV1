import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MangaFacadeService} from "../manga-facade.service";
import {EditorDto} from "../dto/EditorDto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-manga-form',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatCardModule,
    MatError,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatToolbar,
    RouterLink,
    ReactiveFormsModule,
    MatIconButton,
    NgxMatFileInputModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './manga-form.component.html',
  styleUrl: './manga-form.component.css'
})
export class MangaFormComponent implements OnInit{
  isCreateManga = this.route.snapshot.routeConfig?.path?.includes("nouveau-manga");

  idEditorFromUrl = this.route.snapshot.params['idEditeur'];
  listEditors : EditorDto[] | undefined;

  idMangaFromUrl = this.route.snapshot.params['idManga'];

  mangaForm = new FormGroup({
    editor: new FormControl('', [Validators.required]),
    libelle: new FormControl('', [Validators.required]),
    urlImg: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private mangaFacadeService: MangaFacadeService) {}

  ngOnInit() {
    this.mangaFacadeService.getEditor(this.idEditorFromUrl)
      ?.subscribe({
        error: (errorHttp: HttpErrorResponse) => {
          if (errorHttp.error.statusCode === 404) {
            this.mangaFacadeService.navigate(['error-404']);
          }
          console.error(errorHttp);
        }
      }
    )

    if (!this.isCreateManga){
      this.mangaFacadeService.getManga(this.idMangaFromUrl)
        ?.subscribe({
            next: (data) => {
              this.idMangaFromUrl = data._id;
              this.mangaForm.controls.libelle.setValue(data.libelle);
              this.mangaForm.controls.urlImg.setValue(data.urlImg);
            }, error: () => {
              this.mangaFacadeService.navigate(['error-404']);
            }
          }
        );
    }

    this.mangaFacadeService.getAllEditors().subscribe({
      next: (data) => {
        this.listEditors = data;
        this.mangaForm.controls.editor.setValue(this.idEditorFromUrl)
      }, error: () => {
        this.mangaFacadeService.openDialog('Erreur lors de la récupération des éditeurs! Veuillez réessayer.');
      }
    });
  }

  onSubmit() {
    this.isCreateManga ? this.onCreate() : this.onUpdate()
  }

  goBack() {
    this.mangaFacadeService.navigate(
      [this.isCreateManga ? `editeur/${this.idEditorFromUrl}`
        : `editeur/${this.idEditorFromUrl}/manga/${this.idMangaFromUrl}`]
    );
  }

  private onCreate() {
    this.mangaFacadeService.createManga(
      this.mangaForm.value.libelle!,
      this.listEditors?.find((element) => element._id === this.mangaForm.value.editor!)!,
      this.mangaForm.value.urlImg!
    ).subscribe({
      next: (newManga) => {
        this.mangaFacadeService.navigate([ `editeur/${this.mangaForm.value.editor!}/manga/${newManga._id}`]);
      }, error: () => {
        this.mangaFacadeService.openDialog('Erreur lors de la création du manga!\nVeuillez réessayer.');
      }
    });
  }

  private onUpdate() {
    this.mangaFacadeService.updateManga(
      this.idMangaFromUrl!,
      this.mangaForm.value.libelle!,
      this.listEditors?.find((element) => element._id === this.mangaForm.value.editor!)!,
      this.mangaForm.value.urlImg!
    ).subscribe({
      next: (manga) => {
        this.mangaFacadeService.navigate([ `editeur/${this.mangaForm.value.editor!}/manga/${manga._id}`]);
      }, error: () => {
        this.mangaFacadeService.openDialog('Erreur lors de la modification  du manga!\nVeuillez réessayer.');
      }
    });
  }
}
