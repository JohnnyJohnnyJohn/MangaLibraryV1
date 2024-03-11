import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, UpperCasePipe} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {EditorDto} from "../dto/EditorDto";
import {EditorFacadeService} from "../editor-facade.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MangaDto} from "../dto/MangaDto";

@Component({
  selector: 'app-editor-display',
  standalone: true,
  imports: [
    NgForOf,
    FlexModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbarModule,
    UpperCasePipe,
    MatFabButton,
    RouterLink,
    MatListModule,
    FormsModule,
    MatButton,
    MatCardModule,
  ],
  templateUrl: './editor-display.component.html',
  styleUrl: './editor-display.component.css'
})
export class EditorDisplayComponent implements OnInit{
  editor: EditorDto | undefined;
  mangas: MangaDto[] | undefined;

  constructor(private editorFacadeService: EditorFacadeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editorFacadeService.getEditor(this.route.snapshot.params['idEditeur'])
      ?.subscribe({
        next: (editor: EditorDto) => {
          this.editor = editor;
          this.getMangasFromEditor(editor._id);
        }, error: (errorHttp: HttpErrorResponse) => {
          this.editorFacadeService.navigate(['error-404']);
          console.error(errorHttp);
        }
      }
    )
  }

  private getMangasFromEditor(idEditor: string) {
    this.editorFacadeService.getAllMangas()
      ?.subscribe({
        next: (mangas: MangaDto[]) => {
          this.mangas = this.editorFacadeService.filterMangasByEditor(mangas, idEditor);
        }, error: (errorHttp: HttpErrorResponse) => {
          this.editorFacadeService.navigate(['error-404']);
          console.error(errorHttp);
        }
      }
    )
  }
}
