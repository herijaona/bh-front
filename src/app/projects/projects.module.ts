import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ProjectsComponent } from "./projects/projects.component";
import { CKEditorModule } from "ng2-ckeditor";
import { ProjectPageContentComponent } from "./project-page-content/project-page-content.component";
import { ProjectEditAndNewComponent } from "./project-edit-and-new/project-edit-and-new.component";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		CKEditorModule
	],
	entryComponents: [ProjectEditAndNewComponent],

	declarations: [
		ProjectsComponent,
		ProjectPageContentComponent,
		ProjectEditAndNewComponent
	]
})
export class ProjectsModule {}
