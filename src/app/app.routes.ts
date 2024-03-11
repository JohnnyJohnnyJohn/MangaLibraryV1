import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {EditorDisplayComponent} from "./editor-display/editor-display.component";
import {MangaDisplayComponent} from "./manga-display/manga-display.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterComponent} from "./register/register.component";
import {EditorFormComponent} from "./editor-form/editor-form.component";
import {MangaFormComponent} from "./manga-form/manga-form.component";
import {CharacterFormComponent} from "./character-form/character-form.component";
import {AuthGuard} from "./auth-guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/manga/:idManga/personnage/:idPerso/update', component: CharacterFormComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/manga/:idManga/nouveau-personnage', component: CharacterFormComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/manga/:idManga/update', component: MangaFormComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/manga/:idManga', component: MangaDisplayComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/nouveau-manga', component: MangaFormComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur/update', component: EditorFormComponent, canActivate: [AuthGuard] },
  { path: 'editeur/:idEditeur', component: EditorDisplayComponent, canActivate: [AuthGuard] },
  { path: 'nouvel-editeur', component: EditorFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error-404', component: PageNotFoundComponent },
  { path: '**', redirectTo:'error-404' }
];
