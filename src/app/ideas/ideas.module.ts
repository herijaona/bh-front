import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { IdeasComponent } from "./ideas/ideas.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { Routes, RouterModule } from "@angular/router";
import { EditNewSstrComponent } from './edit-new-sstr/edit-new-sstr.component';

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,MDBBootstrapModule.forRoot(),
		FormsModule,
		RouterModule
	],
	declarations: [IdeasComponent, EditNewSstrComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class IdeasModule {}
