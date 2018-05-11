import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SectionEditButtonComponent } from "./section-edit-button/section-edit-button.component";
import { EditPageButtonComponent } from "./edit-page-button/edit-page-button.component";
import { ImSelectComponent } from "./im-select/im-select.component";
import { BhSafeHtmlPipe } from "../pipe/bh-safe-html.pipe";
import { PageHeaderComponent } from "./page-header/page-header.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		MDBBootstrapModule.forRoot()
	],
	declarations: [
		PageHeaderComponent,
		SectionEditButtonComponent,
		EditPageButtonComponent,
		ImSelectComponent,
		BhSafeHtmlPipe
	],
	exports: [
		PageHeaderComponent,
		SectionEditButtonComponent,
		ImSelectComponent,
		EditPageButtonComponent,
		BhSafeHtmlPipe
	]
})
export class GeneralUtilitiesModule {}
