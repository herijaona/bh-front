import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionApplicationComponent } from './question-application/question-application.component';
import { ViewReactionComponent } from './view-reaction/view-reaction.component';
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";

@NgModule({
  imports: [
    CommonModule,
    GeneralUtilitiesModule
  ],
  declarations: [QuestionApplicationComponent, ViewReactionComponent]
})
export class CompanyDataModule { }
