import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MindsetComponent } from "./mindset/mindset.component";
import { PageHeaderComponent } from "./page-header/page-header.component";
import { EditPageButtonComponent } from "./edit-page-button/edit-page-button.component";
import { PresentationSideComponent } from "./presentation-side/presentation-side.component";
import { SectionEditButtonComponent } from "./section-edit-button/section-edit-button.component";
import { ImSelectComponent } from "./im-select/im-select.component";
import { QuillModule } from "ngx-quill";
import { BhSafeHtmlPipe } from "../pipe/bh-safe-html.pipe";
import { ZoneMindsetComponent } from './zone-mindset/zone-mindset.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		QuillModule,
		FormsModule,
		MDBBootstrapModule.forRoot()
	],
	declarations: [
		MindsetComponent,
		BhSafeHtmlPipe,
		PageHeaderComponent,
		EditPageButtonComponent,
		PresentationSideComponent,
		SectionEditButtonComponent,
		ImSelectComponent,
		ZoneMindsetComponent
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class MindsetModule {}
