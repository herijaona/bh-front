import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { DescriptionProjectComponent } from './description-project/description-project.component';

@NgModule({
  imports: [
    CommonModule,
    GeneralUtilitiesModule
  ],
  declarations: [DescriptionProjectComponent]
})
export class DescriptionProjectModule { }
