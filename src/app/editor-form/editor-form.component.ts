import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EditorDto} from "../dto/EditorDto";
import {EditorFacadeService} from "../editor-facade.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-editor-form',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatToolbar,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.css'
})
export class EditorFormComponent implements OnInit{
  isCreateEditor: boolean | undefined;
  idEditeurFromUrl: string | undefined;

  editorForm = new FormGroup({
    libelle: new FormControl('', [Validators.required])
  });

  constructor(private editorFacadeService: EditorFacadeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isCreateEditor = this.route.snapshot.routeConfig?.path?.includes("nouvel-editeur");

    if (!this.isCreateEditor) {
      this.editorFacadeService.getEditor(this.route.snapshot.params['idEditeur'])
        ?.subscribe({
          next: (editorDto: EditorDto) => {
            this.editorForm.controls.libelle.setValue(editorDto.libelle);
            this.idEditeurFromUrl = editorDto._id
          }, error: (errorHttp: HttpErrorResponse) => {
            if (errorHttp.error.statusCode === 404) {
              this.editorFacadeService.navigate(['error-404']);
            }
            console.error(errorHttp);
          }
        })
    }
  }

  goBack() {
    this.editorFacadeService.navigate([this.isCreateEditor ? "" : `editeur/${this.idEditeurFromUrl}`]);
  }

  onSubmit() {
    this.isCreateEditor ? this.onCreate() : this.onUpdate()
  }

  private onCreate() {
    if(this.editorForm.valid){
      this.editorFacadeService.createEditor(
        this.editorForm.value.libelle!
      ).subscribe({
        next: (response: object) => {
          this.goBack();
        },
        error: (errorHttp: HttpErrorResponse) => {
          this.editorFacadeService.openDialog('Il y a eu une erreur lors de la création de l\'éditeur!\nVeuillez réessayer.')

          console.error(errorHttp);
        }
      });
    }
  }

  private onUpdate() {
    if(this.editorForm.valid){
      this.editorFacadeService.updateEditor(
        this.idEditeurFromUrl!,
        this.editorForm.value.libelle!
      ).subscribe({
        next: (response: object) => {
          this.goBack();
        },
        error: (errorHttp: HttpErrorResponse) => {
          this.editorFacadeService.openDialog('Il y a eu une erreur lors de la mise à jour de l\'éditeur!\nVeuillez réessayer.')

          console.error(errorHttp);
        }
      });
    }
  }
}
