import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamComponent } from "./team/team.component";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { MindsetModule } from "../mindset/mindset.module";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { TeamContentComponent } from "./team-content/team-content.component";
import { TeamFrontNewComponent } from "./team-front-new/team-front-new.component";
import { FrontVteamComponent } from "./front-vteam/front-vteam.component";

@NgModule({
	imports: [
		CommonModule,
		MindsetModule,
		ReactiveFormsModule,
		FormsModule,
		GeneralUtilitiesModule,
		RouterModule,
		MDBBootstrapModule.forRoot()
	],
	schemas: [NO_ERRORS_SCHEMA],
	declarations: [
		TeamComponent,
		TeamContentComponent,
		TeamFrontNewComponent,
		FrontVteamComponent
	]
})
export class TeamModule {}
