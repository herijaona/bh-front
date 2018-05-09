import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    GeneralUtilitiesModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
