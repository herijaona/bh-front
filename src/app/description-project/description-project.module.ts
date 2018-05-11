import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { MDBBootstrapModule } from "angular-bootstrap-md";

import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { DescriptionProjectComponent } from "./description-project/description-project.component";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		RouterModule,
		MDBBootstrapModule
	],
	declarations: [DescriptionProjectComponent]
})
export class DescriptionProjectModule {}
