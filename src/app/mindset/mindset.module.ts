import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MindsetComponent } from "./mindset/mindset.component";
import { PresentationSideComponent } from "./presentation-side/presentation-side.component";
import { QuillModule } from "ngx-quill";
import { BhSafeHtmlPipe } from "../pipe/bh-safe-html.pipe";
import { ZoneMindsetComponent } from "./zone-mindset/zone-mindset.component";
import { NgxMasonryModule } from "ngx-masonry";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { OneZoneComponent } from "./one-zone/one-zone.component";
import { NewZoneMindsetComponent } from "./new-zone-mindset/new-zone-mindset.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		QuillModule,
		NgxMasonryModule,
		RouterModule,
		GeneralUtilitiesModule,
		FormsModule,
		MDBBootstrapModule.forRoot()
	],
	declarations: [
		MindsetComponent,
		NewZoneMindsetComponent,
		PresentationSideComponent,
		ZoneMindsetComponent,
		OneZoneComponent,
		BhSafeHtmlPipe
	],
	schemas: [NO_ERRORS_SCHEMA],
	exports: [BhSafeHtmlPipe]
})
export class MindsetModule {}
