import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamComponent } from "./team/team.component";
import { PageHeaderComponent } from "../mindset/page-header/page-header.component";
import { MindsetModule } from "../mindset/mindset.module";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { TeamContentComponent } from "./team-content/team-content.component";
import { TeamFrontNewComponent } from "./team-front-new/team-front-new.component";

@NgModule({
	imports: [
		CommonModule,
		MindsetModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		MDBBootstrapModule.forRoot()
	],
	schemas: [NO_ERRORS_SCHEMA],
	declarations: [TeamComponent, TeamContentComponent, TeamFrontNewComponent]
})
export class TeamModule {}
