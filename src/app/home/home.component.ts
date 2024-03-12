import {Component, OnInit} from '@angular/core';
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import { Article } from "../article"
import {RouterLink} from "@angular/router";
import {MatListItemAvatar} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {ArticleService} from "../article.service";
import {EditorDto} from "../dto/EditorDto";
import {EditorFacadeService} from "../editor-facade.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatToolbar,
    FlexModule,
    MatCardModule,
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    MatFabButton,
    MatListItemAvatar,
    MatDivider,
    MatButton,
    MatMiniFabButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  editors: EditorDto[] = [];
  articles: Article[] = [];

  constructor(private editorFacadeService: EditorFacadeService, private articleService: ArticleService) {}

  ngOnInit() {
    this.articles = this.articleService.getArticles();

    this.editorFacadeService.getAllEditors()
      .subscribe({
        next: (data) => {
          this.editors = data;
        }, error: () => {
            this.editorFacadeService.openDialog('Erreur lors de la récupération des éditeurs! Veuillez réessayer.');
        }
      });
  }

  logout() {
    this.editorFacadeService.logout()
  }
}
