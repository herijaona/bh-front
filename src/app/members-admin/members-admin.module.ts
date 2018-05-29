import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { UserAuthModule } from "../user-auth/user-auth.module";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		UserAuthModule,
		RouterModule
	],
	declarations: [],
	exports: []
})
export class MembersAdminModule {}
