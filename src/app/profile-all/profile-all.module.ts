import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		RouterModule
	],
	declarations: []
})
export class ProfileAllModule {}
