import { Injectable } from '@angular/core';
import * as jsonListArticles from '../assets/list-articles.json';
import {Article} from "./article";
import {Editeur} from "./editeur";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  listArticles: Article[] = jsonListArticles.articles;

  constructor() { }

  getArticles(): Article[]{
    return this.listArticles;
  }
}
