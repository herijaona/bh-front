import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { DescriptionProjectComponent } from './description-project/description-project.component';

@NgModule({
  imports: [
    CommonModule,
    GeneralUtilitiesModule,
    RouterModule
  ],
  declarations: [DescriptionProjectComponent]
})
export class DescriptionProjectModule { }
