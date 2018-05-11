import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ProjectsComponent } from "./projects/projects.component";
import { CKEditorModule } from "ng2-ckeditor";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectEditAndNewComponent } from "./project-edit-and-new/project-edit-and-new.component";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		CKEditorModule
	],
	entryComponents: [ProjectEditAndNewComponent],

	declarations: [
		ProjectsComponent,
		ProjectListComponent,
		ProjectEditAndNewComponent
	]
})
export class ProjectsModule {}
