import { Location } from '@angular/common'
import { Component } from '@angular/core';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    FlexModule,
    MatCardModule,
    MatDivider,
    MatFabButton,
    MatIcon,
    MatToolbar,
    RouterLink,
    UpperCasePipe,
    FlexLayoutModule
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.historyGo(-2)
  }

}
