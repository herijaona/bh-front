import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CKEditorModule } from "ng2-ckeditor";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { PModalShowComponent } from "./p-modal-show/p-modal-show.component";
import { DescriptionProjectComponent } from "./description-project/description-project.component";
import { ProjectApplyComponent } from "./project-apply/project-apply.component";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		CKEditorModule,
		RouterModule,
		MDBBootstrapModule.forRoot()
	],
	schemas: [NO_ERRORS_SCHEMA],
	declarations: [
		DescriptionProjectComponent,
		PModalShowComponent,
		ProjectApplyComponent
	]
})
export class DescriptionProjectModule {}
