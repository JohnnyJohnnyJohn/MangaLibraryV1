import { Injectable } from '@angular/core';
import * as jsonListArticles from '../assets/list-articles.json';
import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  listArticles: Article[] = jsonListArticles.articles;

  getArticles(): Article[]{
    return this.listArticles;
  }
}
