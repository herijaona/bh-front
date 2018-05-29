import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ProjectsComponent } from "./projects/projects.component";
import { CKEditorModule } from "ng2-ckeditor";
import { ProjectListComponent } from "./project-list/project-list.component";

import { MindsetModule } from "../mindset/mindset.module";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		MindsetModule,
		RouterModule,
		CKEditorModule
	],
	declarations: [
		ProjectsComponent,
		ProjectListComponent,
	],
	exports:[]
})
export class ProjectsModule {}
